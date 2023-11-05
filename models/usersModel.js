const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    login: {
      type: String,
      required: [true, "Login is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ["standard", "admin"],
      default: "standard",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  }
);

const User = mongoose.model("user", user);

module.exports = User;
