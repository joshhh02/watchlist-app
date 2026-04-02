// hsp - userRoutes.ts
// Provides user search and public profile lookup endpoints.
// Does NOT expose passwordHash, email, or internal auth fields.

import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

// GET /api/users/search?query=...
// Partial-match, case-insensitive username search.
// Returns only safe public fields: _id, username, profileVisibility.
// Requires at least 2 characters to prevent full-database scans.
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "Query must be at least 2 characters" });
    }

    // Case-insensitive partial match on username only — never expose email
    const users = await User.find({
      username: { $regex: query.trim(), $options: "i" },
    })
      .select("_id username profileVisibility") // only safe public fields
      .limit(20)
      .lean();

    return res.status(200).json({ users });
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({ message: "Failed to search users" });
  }
});

// GET /api/users/:userId
// Returns a public profile view. If profileVisibility is "private",
// returns a minimal response so the frontend can show "This profile is private."
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("_id username profileVisibility createdAt")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If private, return limited info so the UI can display the privacy message
    if (user.profileVisibility === "private") {
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        profileVisibility: "private",
      });
    }

    // Public profile — safe to return joined date too
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      profileVisibility: user.profileVisibility,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("User profile fetch error:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

export default router;
