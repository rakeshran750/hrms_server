const Leave = require('../model/leaveModel');

// Create a new leave request for a specific employee
exports.createLeaveById = async (req, res) => {
    console.log(req.user)
    try {
        const { leaveType, leaveFrom, leaveUpTo } = req.body;
        // const { employeeId } = req.params; 
        const  employeeId  = req.user.employee_id;

        if (!leaveType || !leaveFrom || !leaveUpTo) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const leave = new Leave({ employee_id: employeeId, leaveType, leaveFrom, leaveUpTo });
        await leave.save();

        res.status(201).json({ success: true, data: leave });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Approve or reject a leave request by approver ID
exports.approveLeaveByApproverId = async (req, res) => {
    try {
        // const { approverId } = req.params; // Extract approver ID from params
        const  approverId  = req.user.employee_id;

        const { leaveId, leaveStatus, approvalComments } = req.body; // Extract leaveId from body

        if (!leaveId || !['approved', 'rejected'].includes(leaveStatus)) {
            return res.status(400).json({ success: false, message: 'Invalid leave ID or status' });
        }

        const leave = await Leave.findByIdAndUpdate(
            leaveId,
            {
                leaveStatus,
                approver: approverId,
                approveOn: new Date(),
                approvalComments,
            },
            { new: true }
        );

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave not found' });
        }

        res.status(200).json({ success: true, data: leave });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all leave requests for a specific employee
exports.getAllLeaveByEmployeeId = async (req, res) => {
    try {
        // const { employeeId } = req.params; // Extract employeeId from params
        const  employeeId  = req.user.employee_id;
        
        const leaves = await Leave.find({ employee_id: employeeId }).populate('employee_id approver');

        if (!leaves.length) {
            return res.status(404).json({ success: false, message: 'No leave requests found for this employee' });
        }

        res.status(200).json({ success: true, data: leaves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all leave requests
exports.getAllLeave = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employee_id approver');
        res.status(200).json({ success: true, data: leaves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all pending leave requests
exports.getAllPendingLeaves = async (req, res) => {
    try {
        const pendingLeaves = await Leave.find({ leaveStatus: 'pending' }).populate('employee_id approver');
        if (!pendingLeaves.length) {
            return res.status(404).json({ success: false, message: 'No pending leave requests found' });
        }
        res.status(200).json({ success: true, data: pendingLeaves });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};