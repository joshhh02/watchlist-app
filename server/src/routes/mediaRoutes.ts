import { Router, Request, Response as ExpressResponse } from "express";
import Media from "../models/Media";

const router = Router();

const getOmdbApiKey = (): string | null => process.env.OMDB_API_KEY || null;

// GET /api/media/search?title=...
// Calls OMDb search endpoint and returns results. Does not persist to DB.
router.get("/search", async (req: Request, res: ExpressResponse) => {
	try {
		const { title } = req.query;

		if (!title || typeof title !== "string" || title.trim() === "") {
			return res.status(400).json({ message: "title query parameter is required" });
		}

		const apiKey = getOmdbApiKey();
		if (!apiKey) {
			return res.status(500).json({ message: "OMDb API key is not configured" });
		}

		let omdbData: Record<string, unknown>;
		try {
			const omdbRes = await fetch(
				`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(title.trim())}`
			);
			if (!omdbRes.ok) {
				return res.status(502).json({ message: "OMDb API request failed" });
			}
			omdbData = (await omdbRes.json()) as Record<string, unknown>;
		} catch {
			return res.status(502).json({ message: "Failed to reach OMDb API" });
		}

		if (omdbData["Response"] === "False") {
			return res
				.status(404)
				.json({ message: (omdbData["Error"] as string) || "No results found" });
		}

		const rawResults = omdbData["Search"] as Record<string, unknown>[];
		const results = rawResults.map((item) => ({
			imdbID: item["imdbID"],
			title: item["Title"],
			year: item["Year"],
			type: item["Type"],
			poster: item["Poster"],
		}));

		return res.status(200).json({ results });
	} catch (error) {
		console.error("Media search error:", error);
		res.status(500).json({ message: "Failed to search media" });
	}
});

// GET /api/media/:imdbID
// Returns media from MongoDB if it exists; otherwise fetches from OMDb, saves, and returns it.
router.get("/:imdbID", async (req: Request, res: ExpressResponse) => {
	try {
		const { imdbID } = req.params;

		// Return from DB if already stored
		const existing = await Media.findOne({ imdbID });
		if (existing) {
			return res.status(200).json(existing);
		}

		// Fetch from OMDb
		const apiKey = getOmdbApiKey();
		if (!apiKey) {
			return res.status(500).json({ message: "OMDb API key is not configured" });
		}

		let omdbData: Record<string, unknown>;
		try {
			const omdbRes = await fetch(
				`https://www.omdbapi.com/?apikey=${encodeURIComponent(apiKey)}&i=${encodeURIComponent(imdbID)}`
			);
			if (!omdbRes.ok) {
				return res.status(502).json({ message: "OMDb API request failed" });
			}
			omdbData = (await omdbRes.json()) as Record<string, unknown>;
		} catch {
			return res.status(502).json({ message: "Failed to reach OMDb API" });
		}

		if (omdbData["Response"] === "False") {
			return res
				.status(404)
				.json({ message: (omdbData["Error"] as string) || "Media not found" });
		}

		// Store only the fields our schema requires
		const newMedia = new Media({
			imdbID: omdbData["imdbID"],
			title: omdbData["Title"],
		});
		await newMedia.save();

		return res.status(200).json(newMedia);
	} catch (error) {
		console.error("Media fetch error:", error);
		res.status(500).json({ message: "Failed to fetch media" });
	}
});

export default router;
