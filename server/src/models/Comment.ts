import mongoose from "mongoose";

// This model maps to the 'reviews' collection in MongoDB
const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		imdbID: {
			type: String,
			required: true,
		},
		reviewText: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 10,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Review", reviewSchema, "reviews");
