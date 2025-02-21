const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Attendance Schema
const attendanceSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["absent", "present"],
      required: true,
    },
    inTime: {
      type: String, // Store time in HH:mm AM/PM format
    },
    outTime: {
      type: String, // Store time in HH:mm AM/PM format
    },
    workingHours: {
      type: Number,
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Helper function to convert Date to 12-hour time format (HH:mm AM/PM)
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 or 12 to 12-hour format
  return `${hours}:${minutes} ${ampm}`;
};

// Pre-save hook to calculate working hours only on punch-out
attendanceSchema.pre("save", function (next) {
  if (this.status === "present" && this.inTime && this.outTime) {
    // Convert HH:mm AM/PM back to Date object for calculation
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const inDate = parseTime(this.inTime);
    const outDate = parseTime(this.outTime);

    this.workingHours = (outDate - inDate) / (1000 * 60 * 60); // Convert to hours
  }
  next();
});

// Create the Attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
