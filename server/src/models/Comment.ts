import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
		commentText: {
			type: String,
			required: true,
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

export default mongoose.model("Comment", commentSchema);
