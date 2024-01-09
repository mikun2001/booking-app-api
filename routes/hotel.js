import express, { Router } from "express";
import hotel from "../models/hotel.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("hello, this is hotel end point.");
});

//GET
//GET ALL
//CREATE
router.post("/", async (req, res) => {
	const newHotel = new hotel(req.body);
	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (error) {
		res.status(500).json(error);
	}
});
//UPDATE
//DELETE
export default router;
