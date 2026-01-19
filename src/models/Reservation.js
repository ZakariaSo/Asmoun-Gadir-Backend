import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Activity from "./Activity.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    touristId: { // <- Ajouté
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    activityId: { // <- Ajouté
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    numberOfPlaces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "reservations",
    timestamps: true,
  }
);

// Mise à jour du nombre de places après création
Reservation.afterCreate(async (reservation) => {
  const activity = await Activity.findByPk(reservation.activityId);

  if (!activity) {
    throw new Error("Activity not found");
  }

  if (activity.availablePlaces < reservation.numberOfPlaces) {
    throw new Error("Not enough available places");
  }

  activity.availablePlaces -= reservation.numberOfPlaces;

  if (activity.availablePlaces === 0) {
    activity.status = "full";
  }

  await activity.save();
});

export default Reservation;
