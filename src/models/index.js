export { default as User } from "./User.js";
export { default as Activity } from "./Activity.js";
export { default as Reservation } from "./Reservation.js";

import User from "./User.js";
import Activity from "./Activity.js";
import Reservation from "./Reservation.js";

User.hasMany(Reservation);
Reservation.belongsTo(User);

Activity.hasMany(Reservation);
Reservation.belongsTo(Activity);
