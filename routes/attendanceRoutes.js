
const express = require("express");
const { punchIn, punchOut, getAttendanceByUser } = require("../controller/attendanceController");
const authMiddleware = require('../middleware/authMiddleware')




const router = express.Router();

// Punch In Route
router.post("/punch-in",authMiddleware, punchIn);

// Punch Out Route
router.post("/punch-out",authMiddleware, punchOut);

// Get Attendance by User ID
router.get("/",authMiddleware, getAttendanceByUser);

module.exports = router;