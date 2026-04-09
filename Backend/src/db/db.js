const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/postapp";
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    if (process.env.NODE_ENV === "production") throw err;
    console.warn(
      "Continuing without DB in development. Set MONGO_URI to connect a database.",
    );
  }
}

module.exports = connectDB;
