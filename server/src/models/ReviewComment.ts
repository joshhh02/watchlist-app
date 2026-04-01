import mongoose from "mongoose";

// This model maps to the 'reviewComments' collection in MongoDB
const reviewCommentSchema = new mongoose.Schema(
	{
		reviewId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
			required: true,
		},
		authorUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		commentText: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Explicit collection name: mongoose would default to 'reviewcomments' (lowercase), but DB uses 'reviewComments'
export default mongoose.model("ReviewComment", reviewCommentSchema, "reviewComments");
