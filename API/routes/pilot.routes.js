import express from "express";
import { getPilots } from "../controllers/pilot.controllers.js";

const router = express.Router();

router.post("/", getPilots);

export default router;
