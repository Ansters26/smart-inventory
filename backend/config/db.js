const mongoose = require("mongoose");

module.exports = function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.log("Mongo error", err);
    });
};
