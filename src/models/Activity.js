import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  dateStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER, // en minutes
    allowNull: false,
  },

  meetingPoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  totalPlaces: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  availablePlaces: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("draft", "published", "full", "cancelled"),
    defaultValue: "draft",
  },
});

export default Activity;
