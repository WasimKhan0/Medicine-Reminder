const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
//401 -> Unauthorized

router.post("/register", async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
      
    const salt = await bcrypt.genSalt(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      email,
      mobile,
      password: hashedPass,
    });

    const userReg = await user.save();
    res.status(200).json(userReg);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json("Invalid credentials");
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("user not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
 
module.exports = router;
