import User from "./User.js";
import Accommodation from "./Accommodation.js";
import Activity from "./Activity.js";
import Reservation from "./Reservation.js";

User.hasOne(Accommodation, { foreignKey: "userId" });
Accommodation.belongsTo(User);

Accommodation.hasMany(Activity, { foreignKey: "accommodationId" });
Activity.belongsTo(Accommodation);

User.hasMany(Reservation, { foreignKey: "touristId" });
Reservation.belongsTo(User, { foreignKey: "touristId", as: "tourist" });

Activity.hasMany(Reservation, { foreignKey: "activityId" });
Reservation.belongsTo(Activity, { foreignKey: "activityId" });
