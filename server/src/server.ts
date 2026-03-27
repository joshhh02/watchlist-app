import dotenv from "dotenv";

import app from "./app";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const port = process.env.PORT || 5001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
