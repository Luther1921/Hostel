const express = require("express");
const mongoose = require("mongoose");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const houseRouter = require("./routers/houseRoutes");
const userRouter = require("./routers/userRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/house", houseRouter);
app.use("/user", userRouter);

connectDB();

app.listen(2000, () => {
  console.log("server is up and running");
});

app.use(errorHandler);
