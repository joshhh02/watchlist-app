import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
	{
		imdbID: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
		},
		poster: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Media", mediaSchema, "media");