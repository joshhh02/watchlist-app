import dotenv from "dotenv";
import mongoose from "mongoose";
import Media from "./src/models/Media";
import connectDB from "./src/config/db";

dotenv.config();

const seedData = [
	{
		title: "The Shawshank Redemption",
		type: "movie",
		genres: ["Drama", "Crime"],
		releaseYear: 1994,
		description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
		posterUrl: "https://via.placeholder.com/300x450?text=Shawshank",
	},
	{
		title: "Inception",
		type: "movie",
		genres: ["Sci-Fi", "Action", "Thriller"],
		releaseYear: 2010,
		description: "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
		posterUrl: "https://via.placeholder.com/300x450?text=Inception",
	},
	{
		title: "Breaking Bad",
		type: "tv",
		genres: ["Crime", "Drama", "Thriller"],
		releaseYear: 2008,
		description: "A high school chemistry teacher turned meth manufacturer partners with a former student to produce crystal meth.",
		posterUrl: "https://via.placeholder.com/300x450?text=Breaking+Bad",
	},
	{
		title: "The Office",
		type: "tv",
		genres: ["Comedy"],
		releaseYear: 2005,
		description: "A mockumentary about everyday life at an American paper company office.",
		posterUrl: "https://via.placeholder.com/300x450?text=The+Office",
	},
	{
		title: "Attack on Titan",
		type: "anime",
		genres: ["Action", "Adventure", "Dark Fantasy"],
		releaseYear: 2013,
		description: "Humanity fights for survival against giant humanoid aliens known as Titans.",
		posterUrl: "https://via.placeholder.com/300x450?text=Attack+on+Titan",
	},
	{
		title: "Death Note",
		type: "anime",
		genres: ["Supernatural", "Thriller", "Psychological"],
		releaseYear: 2006,
		description: "A high schooler finds a supernatural notebook that allows him to eliminate anyone by writing their name in it.",
		posterUrl: "https://via.placeholder.com/300x450?text=Death+Note",
	},
	{
		title: "The Matrix",
		type: "movie",
		genres: ["Sci-Fi", "Action"],
		releaseYear: 1999,
		description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
		posterUrl: "https://via.placeholder.com/300x450?text=The+Matrix",
	},
	{
		title: "Stranger Things",
		type: "tv",
		genres: ["Drama", "Fantasy", "Horror"],
		releaseYear: 2016,
		description: "When a young boy disappears, his friends, family and local police uncover a mystery involving secret government experiments.",
		posterUrl: "https://via.placeholder.com/300x450?text=Stranger+Things",
	},
];

const seedDatabase = async () => {
	try {
		await connectDB();
		console.log("Connected to MongoDB");

		// Clear existing media
		await Media.deleteMany({});
		console.log("Cleared existing media");

		// Insert new data
		const inserted = await Media.insertMany(seedData);
		console.log(`Inserted ${inserted.length} media items`);

		console.log("Database seeded successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
};

seedDatabase();
