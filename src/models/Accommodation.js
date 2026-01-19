import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM("hotel", "guesthouse", "hostel", "riad"),
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Accommodation;
