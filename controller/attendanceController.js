const Attendance = require("../model/attandacneModel");


/**
 * Punch In: Records time in 12-hour format (HH:mm AM/PM)
 */
const punchIn = async (req, res) => {
  try {
    // const { employeeId } = req.body;
    const  employeeId  = req.user.employee_id;
    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const today = new Date().toISOString().split("T")[0];

    const existingAttendance = await Attendance.findOne({
      employeeId,
      createdAt: { $gte: new Date(today) },
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Already punched in today" });
    }

    const now = new Date();
    const formattedTime = formatTime(now); // Convert to HH:mm AM/PM format

    const attendance = new Attendance({
      employeeId,
      status: "present",
      inTime: formattedTime,
    });

    await attendance.save();
    return res.status(201).json({ success: true, message: "Punch in successful", attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Punch Out: Records time in 12-hour format and calculates working hours
 */
const punchOut = async (req, res) => {
  try {
    // const { employeeId } = req.body;
    const  employeeId  = req.user.employee_id;

    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employeeId,
      createdAt: { $gte: new Date(today) },
      status: "present",
      outTime: { $exists: false },
    });

    if (!attendance) {
      return res.status(404).json({ success: false, message: "No active punch-in found" });
    }

    const now = new Date();
    const formattedTime = formatTime(now); // Convert to HH:mm AM/PM format

    attendance.outTime = formattedTime;

    // Convert stored times back to Date objects for calculation
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const inDate = parseTime(attendance.inTime);
    const outDate = parseTime(formattedTime);

    attendance.workingHours = (outDate - inDate) / (1000 * 60 * 60); // Convert to hours

    await attendance.save();
    return res.status(200).json({ success: true, message: "Punch out successful", attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Attendance by User ID
 */
const getAttendanceByUser = async (req, res) => {
  try {
    // const { employeeId } = req.params;
    const  employeeId  = req.user.employee_id;

    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const attendanceRecords = await Attendance.find({ employeeId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Helper function to format time in 12-hour format (HH:mm AM/PM)
 */
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 or 12 to 12-hour format
  return `${hours}:${minutes} ${ampm}`;
};

module.exports = { punchIn, punchOut, getAttendanceByUser };
