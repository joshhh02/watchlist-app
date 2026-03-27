import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["movie", "tv", "anime"],
			required: true,
		},
		genres: {
			type: [String],
			default: [],
		},
		releaseYear: {
			type: Number,
		},
		description: {
			type: String,
		},
		posterUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Media", mediaSchema);
