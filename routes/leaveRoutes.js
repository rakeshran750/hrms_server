const express = require('express');
const router = express.Router();
const leaveController = require('../controller/leaveController');
const authMiddleware = require('../middleware/authMiddleware')



// Create a new leave request for a specific employee
router.post('/',authMiddleware, leaveController.createLeaveById);

// Approve or reject a leave request by approver ID (leaveId comes in the body)
router.put('/approve/',authMiddleware, leaveController.approveLeaveByApproverId);

// Get all leave requests for a specific employee
router.get('/employee/',authMiddleware, leaveController.getAllLeaveByEmployeeId);

// Get all leave requests
router.get('/', leaveController.getAllLeave);

// Get all pending leave requests
router.get('/pending', leaveController.getAllPendingLeaves);

module.exports = router;
