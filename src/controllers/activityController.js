import Activity from "../models/Activity.js";

/**
 * Create activity
 * POST /api/activities
 */
export const createActivity = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      dateStart,
      duration,
      meetingPoint,
      totalPlaces,
      availablePlaces,
      price,
      status,
    } = req.body;

    const activity = await Activity.create({
      title,
      description,
      category,
      dateStart,
      duration,
      meetingPoint,
      totalPlaces,
      availablePlaces,
      price,
      status,
    });

    res.status(201).json({
      message: "Activity created successfully",
      activity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating activity",
      error: error.message,
    });
  }
};

/**
 * Get all activities
 * GET /api/activities
 */
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching activities",
      error: error.message,
    });
  }
};

/**
 * Get activity by ID
 * GET /api/activities/:id
 */
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching activity",
      error: error.message,
    });
  }
};

/**
 * Update activity
 * PUT /api/activities/:id
 */
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    await activity.update(req.body);
    res.status(200).json({ message: "Activity updated successfully", activity });
  } catch (error) {
    res.status(500).json({ message: "Error updating activity", error: error.message });
  }
};

/**
 * Delete activity
 * DELETE /api/activities/:id
 */
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    await activity.destroy();
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity", error: error.message });
  }
};
