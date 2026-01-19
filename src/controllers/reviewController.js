import Review from "../models/Review.js";
import Activity from "../models/Activity.js";

export const createReview = async (req, res) => {
  try {
    const { activityId, rating, comment } = req.body;
    const touristId = req.user.id; // à récupérer depuis le middleware auth

    if (!activityId || !rating) {
      return res.status(400).json({ message: "activityId and rating are required" });
    }

    const activity = await Activity.findByPk(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const review = await Review.create({
      activityId,
      touristId,
      rating,
      comment,
    });

    return res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

export const getReviewsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const reviews = await Review.findAll({
      where: { activityId },
      include: ["tourist"],
    });

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};
