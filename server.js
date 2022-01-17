require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

/**
 * app config
 */

const app = express(); // Initialize ExpressJs
const port = process.env.PORT || 5001; // Define Port
const database = process.env.DATABASE_URL || "";

mongoose
  .connect(database)
  .then(() => {
    console.log("MongoDB Connected");
    return app.listen(port);
  })
  .then(() => {
    console.log("Server running .... ");
  })
  .catch((err) => console.log("Error occured", { err }));
