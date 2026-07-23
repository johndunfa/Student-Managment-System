const Result = require("../models/result.model");
const calculateGrade = require("../utils/gradeCalculator");

/**
 * GET /api/results/me
 * Student: get only his/her results
 */
exports.getMyResults = async (req, res) => {
  try {
    const studentId = req.user.id;
    const results = await Result.find({ student: studentId });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/results/add
 * Teacher/Admin: add result for a student
 */
exports.addResult = async (req, res) => {
  try {
    const { studentId, course, score } = req.body;

    // Validation
    if (!studentId || !course || !score) {
      return res.status(400).json({ 
        message: "Missing required fields: studentId, course, score" 
      });
    }

    if (score < 0 || score > 100) {
      return res.status(400).json({ 
        message: "Score must be between 0 and 100" 
      });
    }

    // Calculate grade & point using your grading table
    const { grade, point } = calculateGrade(score);

    // Check if result already exists for this student & course
    const existing = await Result.findOne({ 
      student: studentId, 
      course: course.trim() 
    });

    if (existing) {
      return res.status(400).json({ 
        message: "Result already exists for this student in this course" 
      });
    }

    // Create and save new result
    const result = new Result({
      student: studentId,
      course: course.trim(),
      score: Number(score),
      grade,
      point,
      addedBy: req.user.id, // Teacher/Admin ID from JWT
    });

    await result.save();

    // Success response
    res.status(201).json({
      success: true,
      message: "Result added successfully",
      result: {
        id: result._id,
        student: result.student,
        course: result.course,
        score: result.score,
        grade: result.grade,
        point: result.point,
        addedBy: result.addedBy,
      },
    });

  } catch (error) {
    console.error("Add result error:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        message: error.message 
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Duplicate result entry" 
      });
    }

    res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};