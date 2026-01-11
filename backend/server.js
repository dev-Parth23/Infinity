import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./config/db.js";
connectDB();

import userRoutes from "./routes/userRoutes.js";
import chats from "./data/data.js";

app.get("/", function (req, res) {
  res.send("index");
});
// app.get("/api/chat", (req, res) => {
//   try {
//     console.log("Chats data:", chats);
//     res.json(chats);
//   } catch (error) {
//     console.error("API ERROR:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// app.get("/api/chat/:id", (req, res) => {
//   const singlechat = chats.find((c) => c._id === req.params.id);
//   res.send(singlechat);
// });
app.use('/api/user', userRoutes);


const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});