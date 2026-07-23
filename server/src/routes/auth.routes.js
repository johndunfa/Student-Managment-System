const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
