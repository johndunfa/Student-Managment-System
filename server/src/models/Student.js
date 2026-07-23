const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentId: String,
    name: String,
    department: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
