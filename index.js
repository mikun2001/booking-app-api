import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import hotelRoute from "./routes/hotel.js";
import roomRoute from "./routes/room.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
	} catch (error) {
		console.log("Database connection error.");
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB Disconnected on - ", new Date());
});
mongoose.connection.on("connected", () => {
	console.log("MongoDB connected on - ", new Date());
});
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);

//Set error handlers
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});
app.listen("4040", () => {
	connect();
	console.log("Server running successfully on the port 4040.");
});
