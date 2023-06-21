import { mongoose, Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    user: { type: Boolean, default: false },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("messages", messageSchema);
