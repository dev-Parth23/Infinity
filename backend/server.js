import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./config/db.js";
connectDB();
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(express.json());
app.use(cookieParser());


import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
// import chats from "./data/data.js";

const server = http.createServer(app);

app.get("/", function (req, res) {
  res.send("index");
});
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(cors({
  origin: [
    "http://infinity-fe.s3-website-ap-southeast-2.amazonaws.com"
  ],
  credentials: true
}));

const PORT = Number(process.env.PORT) || 5000;
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict to frontend domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("send_message", (messageData) => {
    io.to(messageData.chatId).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});