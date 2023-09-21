const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
