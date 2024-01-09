import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("hello, this is room end point.");
});

export default router;
