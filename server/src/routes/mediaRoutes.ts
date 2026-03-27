import { Router, Request, Response } from "express";
import Media from "../models/Media";
import Watchlist from "../models/Watchlist";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Get all media
router.get("/", async (req: Request, res: Response) => {
	try {
		const media = await Media.find();
		res.status(200).json(media);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch media", error });
	}
});

// Get media by ID
router.get("/:id", async (req: Request, res: Response) => {
	try {
		const media = await Media.findById(req.params.id);
		if (!media) {
			return res.status(404).json({ message: "Media not found" });
		}
		res.status(200).json(media);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch media", error });
	}
});

// Create media (admin only - no auth check for now)
router.post("/", async (req: Request, res: Response) => {
	try {
		const { title, type, genres, releaseYear, description, posterUrl } = req.body;

		if (!title || !type) {
			return res.status(400).json({ message: "Title and type are required" });
		}

		const newMedia = new Media({
			title,
			type,
			genres,
			releaseYear,
			description,
			posterUrl,
		});

		await newMedia.save();
		res.status(201).json({ message: "Media created", data: newMedia });
	} catch (error) {
		res.status(500).json({ message: "Failed to create media", error });
	}
});

export default router;
