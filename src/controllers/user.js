
import { mongoose, Schema, model } from "mongoose";
import { catchAsync } from "../middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Message from "../model/messages.js";

// ----- Register ----- //

export const register = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log(username)
  let user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    res
      .status(500)
      .send({ message: "Email already registered" });
  } else {
    let newUser = await User.create({
      username :username,
      email:email,
      password:bcrypt.hashSync(password)
    });
   
    let token = jwt.sign(
      { userId: newUser._id},
      process.env.SECRET,
    );
    console.log(newUser.userId)
    res.status(201).json({
      userId:newUser._id,
      username:newUser.username,
      email:newUser.email,
      token:token,
    });
  }
});

// ----- Login ----- //

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(404).send({ message: "User Not Found" });
  } else {
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        { userId: user._id },
        process.env.SECRET,
      );
      let messages = await Message.find({ userId: user._id });
      res.status(200).send({
        userId:user._id,
        username:user.username,
        email:user.email,
        token:token,
        messages:messages
      });
    } else {
      res.status(400).send({
        message: "password isn't correct",
      });
    }
  }
});
