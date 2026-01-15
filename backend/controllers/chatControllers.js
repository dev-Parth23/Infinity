import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

/* ======================
   ACCESS / CREATE 1-1 CHAT
====================== */
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId not provided" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    return res.send(isChat[0]);
  }

  const createdChat = await Chat.create({
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(createdChat._id).populate(
    "users",
    "-password"
  );

  res.status(200).send(fullChat);
});

/* ======================
   FETCH ALL USER CHATS
====================== */
const fetchChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const populatedChats = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name email",
  });

  res.status(200).send(populatedChats);
});

/* ======================
   CREATE GROUP CHAT
====================== */
const createGroupChat = asyncHandler(async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const parsedUsers = JSON.parse(users);

  if (parsedUsers.length < 2) {
    return res
      .status(400)
      .json({ message: "Group chat requires at least 3 users" });
  }

  parsedUsers.push(req.user._id);

  const groupChat = await Chat.create({
    chatName: name,
    users: parsedUsers,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });

  const fullGroupChat = await Chat.findById(groupChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(201).send(fullGroupChat);
});

/* ======================
   RENAME GROUP CHAT
====================== */
const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.send(updatedChat);
});

/* ======================
   ADD USER TO GROUP
====================== */
const addToGroupChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.send(updatedChat);
});

/* ======================
   REMOVE USER FROM GROUP
====================== */
const removeFromGroupChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.send(updatedChat);
});

/* ======================
   EXPORTS
====================== */
export {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
};
