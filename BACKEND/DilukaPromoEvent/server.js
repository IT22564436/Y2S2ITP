require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const promoEventRoutes = require("./routes/promoEventRoutes");
const discountRoutes = require("./routes/discountRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/promo-events", promoEventRoutes);
app.use("/api/discounts", discountRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });