import express from 'express';
import {
  getAllComments,
  createComment,
  replyToComment,
  reactToComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createComment);
router.post("/:id/reply", replyToComment);
router.post("/:id/react", reactToComment);

export default router;