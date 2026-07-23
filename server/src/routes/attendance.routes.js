const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance.model");
const User = require("../models/user.model.js");


const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// Teacher: get all students
router.get("/students", auth, role(["teacher"]), async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Teacher: mark attendance
router.post("/mark", auth, role(["teacher"]), async (req, res) => {
  try {
    const { studentId, status, date } = req.body;

    const attendance = new Attendance({
      student: studentId,
      status,
      date,
      markedBy: req.user.id,
    });

    await attendance.save();
    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Student: view own attendance
router.get("/my", auth, role(["student"]), async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user.id })
      .sort({ date: -1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Admin / Teacher: attendance report
router.get(
  "/report",
  auth,
  role(["admin", "teacher"]),
  async (req, res) => {
    try {
      const { studentId, date } = req.query;

      let filter = {};

      if (studentId) filter.student = studentId;
      if (date) filter.date = date;

      const records = await Attendance.find(filter)
        .populate("student", "name email")
        .populate("markedBy", "name");

      res.json(records);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
