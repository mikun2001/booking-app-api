import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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
app.listen("4040", () => {
	connect();
	console.log("Server running successfully on the port 4040.");
});
