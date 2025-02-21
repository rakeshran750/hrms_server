const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Leave Schema
const leaveSchema = new Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    leaveType: {
      type: String,
      required: true,
      enum: ['EL', 'CL', 'SL','Other'],
    },
    leaveFrom: {
      type: String,
      required: true
    },
    leaveUpTo: {
      type: String,
      required: true
    },
    leaveStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: false
    },
    approveOn: {
      type: String,
      required: false
    },
    approvalComments: {
      type: String,
      required: false
    },
    dateApplied: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } 
);

// Create the Leave model
const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
