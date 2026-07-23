const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const { 
  getMyResults, 
  addResult 
} = require("../controllers/result.controller");

// Student: view own results
router.get(
  "/me",
  auth,
  role(["student"]),
  getMyResults
);

// Teacher/Admin: add result
router.post(
  "/add",
  auth,
  role(["teacher", "admin"]),
  addResult
);

module.exports = router;