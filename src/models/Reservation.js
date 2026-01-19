import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reservation = sequelize.define("Reservation", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  confirmationCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Reservation;
