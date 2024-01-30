import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);

	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json("Hotel has been deleted.");
	} catch (err) {
		next(err);
	}
};
export const getHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};
export const getHotels = async (req, res, next) => {
	const { city, min, max, limit, ...others } = req.query;
	let findQ = {
		...others,
		cheapestPrice: {
			$gte: parseInt(min) | 1,
			$lte: parseInt(max) || 999,
		},
	};
	if (city) {
		findQ = {
			...findQ,
			city: { $regex: `${city}`, $options: "i" },
		}
	}
	try {
		console.log(findQ);
		const hotels = await Hotel.find(findQ).limit(parseInt(req.query.limit ? req.query.limit : "10"));
		res.status(200).json(hotels);
	} catch (err) {
		next(err);
	}
};

export const countByCity = async (req, res, next) => {
	if (req.query.cities) {
		try {
			const cities = req.query.cities.split(",");
			const list = await Promise.all(
				cities.map((city) => {
					return Hotel.countDocuments({ city: city });
				})
			);
			res.status(200).json(list);
		} catch (err) {
			next(err);
		}
	}
	// next(createError(404, "City is required ! ! !"));
};
export const countByType = async (req, res, next) => {
	try {
		const hotelCount = await Hotel.countDocuments({ type: "hotel" });
		const apartmentCount = await Hotel.countDocuments({
			type: "apartment",
		});
		const resortCount = await Hotel.countDocuments({ type: "resort" });
		const villaCount = await Hotel.countDocuments({ type: "villa" });
		const cabinCount = await Hotel.countDocuments({ type: "cabin" });

		res.status(200).json([
			{ type: "hotel", count: hotelCount },
			{ type: "apartments", count: apartmentCount },
			{ type: "resorts", count: resortCount },
			{ type: "villas", count: villaCount },
			{ type: "cabins", count: cabinCount },
		]);
	} catch (err) {
		next(err);
	}
};

export const getHotelRooms = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		const list = await Promise.all(
			hotel.rooms.map((room) => {
				return Room.findById(room);
			})
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
