import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      default: null,
    },
    receiver: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      default: 0,
    },
    latestMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Connection", connectionSchema);
