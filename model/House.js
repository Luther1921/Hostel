const mongoose = require("mongoose");
const houseSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      requried: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      min: 4,
      max: 30,
    },
    roomNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    occupation: {
      type: String,
      required: true,
      min: 5,
      max: 30,
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);
module.exports = House;
