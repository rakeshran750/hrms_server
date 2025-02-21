require('dotenv').config();  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../model/employeeModel"); // Ensure the correct path
const JWT_SECRET = process.env.JWT_SECRET


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ success: false, message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ id: employee._id, role: employee.role }, JWT_SECRET);

      res.json({ success: true, message: "Login successful", data: { token, role: employee.role }  });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };
