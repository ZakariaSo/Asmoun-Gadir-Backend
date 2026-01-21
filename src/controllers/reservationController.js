import Reservation from "../models/Reservation.js";
import Activity from "../models/Activity.js";
import User from "../models/User.js";


export const createReservation = async (req, res) => {
  try {
    const { activityId, touristId, numberOfPlaces } = req.body;

    if (!activityId || !touristId || !numberOfPlaces) {
      return res.status(400).json({
        message: "activityId, touristId and numberOfPlaces are required",
      });
    }

    const activity = await Activity.findByPk(activityId);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

   
    if (activity.availablePlaces < numberOfPlaces) {
      return res.status(400).json({ message: "Not enough available places" });
    }


    const totalPrice = activity.price * numberOfPlaces;

  
    const reservation = await Reservation.create({
      activityId,
      touristId,
      numberOfPlaces,
      totalPrice,
      status: "pending",
    });

    return res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating reservation",
      error: error.message,
    });
  }
};


export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: User, as: "tourist", attributes: ["id", "email", "name"] },
        { model: Activity },
      ],
    });

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching reservations", error: error.message });
  }
};


export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, {
      include: [
        { model: User, as: "tourist", attributes: ["id", "email", "name"] },
        { model: Activity },
      ],
    });

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching reservation", error: error.message });
  }
};


export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const reservation = await Reservation.findByPk(id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = status;
    await reservation.save();

    return res.status(200).json({ message: "Reservation updated", reservation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating reservation", error: error.message });
  }
};


export const getMyReservations = async (req, res) => {
  try {
    const touristId = req.user.id; 

    const reservations = await Reservation.findAll({
      where: {
        touristId: touristId,
      },
      include: [
        {
          model: Activity,
          attributes: ["id", "title", "description", "price", "dateStart", "duration", "meetingPoint"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: error.message
    });
  }
};