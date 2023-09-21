const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (userPresent) {
      return res.send({
        message: "User Already present in database, pls Login",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, +process.env.SALT);
      const newUser = new userModel({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(201).send({ message: "User register Successful", newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPresent = await userModel.findOne({ email });
    if (!userPresent) {
      return res.send({
        message: "User not present in database, pls Register",
      });
    } else {
      const isPassCorrect = bcrypt.compareSync(password, userPresent.password);
      if (!isPassCorrect) {
        return res.status(400).send({ message: "Wrong Credential" });
      }
      const accessToken = jwt.sign(
        {
          userId: userPresent._id,
          name: userPresent.name,
        },
        process.env.JWT_SECRETKEY,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRY,
        }
      );
      res.status(201).send({
        message: "User Login Successful",
        accessToken,
        userPresent,
        OK: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};
module.exports = { register, login };
