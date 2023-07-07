const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
