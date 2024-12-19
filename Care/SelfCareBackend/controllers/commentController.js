import Comment from "../models/commentModel.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newComment = new Comment({ text, author, reactions: new Map() });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    comment.replies.push({ text, author });
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const reactToComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reaction } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    const currentCount = comment.reactions.get(reaction) || 0;
    comment.reactions.set(reaction, currentCount + 1);
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};