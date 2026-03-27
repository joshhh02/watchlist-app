import { Router, Response } from "express";
import Comment from "../models/Comment";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Get comments for a media
router.get("/:mediaId", async (req: AuthRequest, res: Response) => {
	try {
		const comments = await Comment.find({ mediaId: req.params.mediaId }).populate(
			"userId",
			"email"
		);
		res.status(200).json(comments);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch comments", error });
	}
});

// Add comment
router.post("/", authenticate, async (req: AuthRequest, res: Response) => {
	try {
		const { mediaId, commentText, rating } = req.body;
		const userId = req.user?.id;

		if (!mediaId || !commentText || !userId) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const newComment = new Comment({
			userId,
			mediaId,
			commentText,
			rating,
		});

		await newComment.save();
		res.status(201).json({ message: "Comment added", data: newComment });
	} catch (error) {
		res.status(500).json({ message: "Failed to add comment", error });
	}
});

export default router;
