import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  getMyReservations, 
  updateReservationStatus,
} from "../controllers/reservationController.js";
import { protect } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Routes 
router.post("/", protect, createReservation); 
router.get("/", getAllReservations); 
router.get("/my-reservations", protect, getMyReservations); 
router.get("/:id", getReservationById); 
router.patch("/:id", updateReservationStatus); 

export default router;