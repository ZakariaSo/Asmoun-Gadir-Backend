import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Activity = sequelize.define("Activity", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalPlaces: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availablePlaces: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Activity;
