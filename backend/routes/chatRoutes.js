import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeFromGroupChat,
  addToGroupChat,
} from "../controllers/chatControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, accessChat)
  .get(protect, fetchChats);

router.route("/group").post(protect, createGroupChat);
router.route("/renamegroup").put(protect, renameGroupChat);
router.route("/removegroup").put(protect, removeFromGroupChat);
router.route("/addgroup").put(protect, addToGroupChat);


export default router;
