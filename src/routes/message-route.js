import { Router } from "express";
import {
  sendMsg,
  translate,
  resetChat
} from "../controllers/message.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = Router();

router.route("/conversation").post(isAuthenticatedUser, sendMsg);
router.route("/translate").post(isAuthenticatedUser, translate);
router.route("/reset").post(isAuthenticatedUser, resetChat);

export default router;
