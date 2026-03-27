import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		mediaId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Media",
			required: true,
		},
		status: {
			type: String,
			enum: ["plan_to_watch", "watching", "completed"],
			default: "plan_to_watch",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Watchlist", watchlistSchema);
