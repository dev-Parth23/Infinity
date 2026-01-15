import express from "express";
import {
  registerUser,
  authUser,
  refreshAccessToken,
  allUsers
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/login", authUser);
router.get("/refresh", refreshAccessToken);
router.post("/", registerUser);
router.get("/", protect, allUsers);

export default router;