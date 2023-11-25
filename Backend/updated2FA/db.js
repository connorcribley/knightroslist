const mongoose = require("mongoose");

mongoose.connect("mongodb://admin:cebd3ddacba44d1cf6e0fe1b4267e62b96b1f1f0b92e4f47@127.0.0.1:27017");

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB Error: ${err.message}`);
  process.exit(1);
});

db.once("open", () => {
  console.log("MongoDB connection successful");
});

require("./models");