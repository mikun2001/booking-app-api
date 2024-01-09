import express, { Router } from "express";
import hotel from "../models/hotel.js";
import {
	createHotel,
	deleteHotel,
	getHotel,
	getHotels,
	updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

export default router;
