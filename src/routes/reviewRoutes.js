import express from "express";
import { createReview, getReviewsByActivity } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Créer un review (seulement pour les utilisateurs connectés)
router.post("/", protect, createReview);

// Récupérer toutes les reviews d'une activité
router.get("/activity/:activityId", getReviewsByActivity);

export default router;
