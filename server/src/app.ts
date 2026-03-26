import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
	res.json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);

export default app;
