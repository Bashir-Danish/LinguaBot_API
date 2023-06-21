import { mongoose, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    default:'pending.'
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export default model("users", userSchema);
