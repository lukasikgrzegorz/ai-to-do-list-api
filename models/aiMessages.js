const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aiMessage = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const AiMessage = mongoose.model("aimessage", aiMessage);

module.exports = AiMessage;
