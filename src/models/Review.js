import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Activity from "./Activity.js";
import User from "./User.js";

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "reviews",
    timestamps: true,
  }
);

// Associations
Review.belongsTo(User, { foreignKey: "touristId", as: "tourist" });
User.hasMany(Review, { foreignKey: "touristId" });

Review.belongsTo(Activity, { foreignKey: "activityId" });
Activity.hasMany(Review, { foreignKey: "activityId" });

export default Review;
