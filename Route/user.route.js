const express = require("express");
const UserModel = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const userController = express.Router();

// User Register
userController.post("/register", async (req, res) => {
  const {name, email, password } = req.body;
  await bcrypt.hash(password, 6, function (err, hash) {
    if (err) {
      res.send("Please try again");
    }
    const user = new UserModel({
      name,
      email,
      password: hash,
    });
    user.save();
    res.send("SignUp Successfull ");
  });
});

// User Login
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email});
  if (!user) {
    return res.send("User not Found");
  }
  
  const hash = user.password;
  const userId = user._id;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      var token = jwt.sign({ email, userId }, "SECRET");
      return res.send({ message: "Login Successfull", token: token });
    } else {
      res.send("Invalid Credentials");
    }
  });
});

module.exports = userController;