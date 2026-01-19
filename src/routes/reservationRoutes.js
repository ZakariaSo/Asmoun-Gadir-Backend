import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

// Routes CRUD
router.post("/", createReservation); // Créer une réservation
router.get("/", getAllReservations); // Lister toutes les réservations
router.get("/:id", getReservationById); // Récupérer une réservation par ID
router.patch("/:id", updateReservationStatus); // Mettre à jour le statut

export default router;
