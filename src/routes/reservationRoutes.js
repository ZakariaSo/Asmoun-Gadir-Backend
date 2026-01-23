import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  getMyReservations,
  updateReservationStatus,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes 
router.post("/", protect, createReservation);
router.get("/", protect, isAdmin, getAllReservations);
router.get("/my-reservations", protect, getMyReservations);
router.get("/:id", protect, getReservationById);
router.patch("/:id", protect, isAdmin, updateReservationStatus);
router.put("/:id", protect, updateReservation);
router.delete("/:id", protect, deleteReservation);

export default router;