import { Router, Response } from "express";
import Watchlist from "../models/Watchlist";

const router = Router();

// GET /api/feed
// Returns the 20 most recent watchlist additions from users with public profiles.
router.get("/", async (_req, res: Response) => {
  try {
    const items = await Watchlist.find()
      .populate({
        path: "userId",
        select: "username profileVisibility",
      })
      .sort({ dateAdded: -1 })
      .limit(60); // fetch extra so we have enough after filtering

    const feed = (items as any[])
      .filter((item) => item.userId && item.userId.profileVisibility === "public")
      .slice(0, 20)
      .map((item) => ({
        _id: item._id,
        username: item.userId.username,
        imdbID: item.imdbID,
        title: item.title || item.imdbID,
        poster: item.poster || null,
        status: item.status,
        dateAdded: item.dateAdded,
      }));

    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feed", error });
  }
});

export default router;
