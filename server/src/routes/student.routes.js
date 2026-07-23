const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

/*
-----------------------------------
GET ALL STUDENTS
Admin & Teacher only
-----------------------------------
*/
router.get(
  "/",
  auth,
  role(["admin", "teacher"]),
  async (req, res) => {
    try {
      const students = await User.find({ role: "student" }).select("-password");
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/*
-----------------------------------
GET LOGGED-IN STUDENT PROFILE
Student only
-----------------------------------
*/
router.get(
  "/me",
  auth,
  role(["student"]),
  async (req, res) => {
    try {
      const student = await User.findById(req.user.id).select("-password");
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
