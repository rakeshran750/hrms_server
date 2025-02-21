// const Employee = require('../model/employeeModel.js');

// // Create a new Employee
// const createEmployee = async (req, res) => {
//   const {
//           emergencyContact: { name, relation, contactNumber },
//           address: { street, city, state, postalCode },
//           firstName,
//           lastName,
//           contact,
//           email,
//           aadhar,
//           pan,
//           bankAccountNo,
//           profilePicLink
//       } = req.body;

//   try {
//     const employee = new Employee(req.body);
//     await employee.save();
//     res.status(201).json({ message: 'Employee created Successfully', data:'', success:true });
//   } catch (error) {
//     console.log('Error creating employee', error )
//     res.status(400).json({ message: 'Error creating employee', success:false});
//   }
// };

// // Get all Employees
// const getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json({msg:"data fetched successfully", data:employees});
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employees', error });
//   }
// };



// // Get Employee by ID
// const getEmployeeById = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.status(200).json({message:'Employee fetched Successfully', data:employee, success:true});
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching employee', error });
//   }
// };


// // Update an Employee by ID
// const updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,    // Return the updated document
//       runValidators: true, // Ensure that validations are applied
//     });
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating employee', error });
//   }
// };

// // Delete an Employee by ID
// const deleteEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.status(200).json({ message: 'Employee deleted successfully', success:true, data:'' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting employee', error });
//   }
// };

// module.exports = {
//   createEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   updateEmployee,
//   deleteEmployee,
// };


const Employee = require('../model/employeeModel.js');

// Create a new Employee
const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contact,
      email,
      password,
      aadhar,
      pan,
      bankAccountNo,
      role,
      status,
      profilePicLink,
      base_salary,
      emergencyContact: { name, relation, contactNumber },
      address: { street, city, state, postalCode }
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !contact || !email || !password || !aadhar || !pan || !bankAccountNo || !role || !status) {
      return res.status(400).json({ message: 'All required fields must be provided.', success: false });
    }

    const employee = new Employee(req.body);
    await employee.save();
    
    res.status(201).json({ message: 'Employee created successfully', success: true });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee', success: false, error: error.message });
  }
};

// Get all Employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: "Data fetched successfully", success: true, data: employees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', success: false, error: error.message });
  }
};

// Get Employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const  id  = req.user.employee_id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }

    res.status(200).json({ message: 'Employee fetched successfully', success: true, data: employee });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', success: false, error: error.message });
  }
};

// Update an Employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      contact,
      email,
      password,
      aadhar,
      pan,
      bankAccountNo,
      role,
      status,
      profilePicLink,
      base_salary,
      emergencyContact: { name, relation, contactNumber },
      address: { street, city, state, postalCode }
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !contact || !email || !aadhar || !pan || !bankAccountNo || !role || !status) {
      return res.status(400).json({ message: 'All required fields must be provided.', success: false });
    }

    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }

    res.status(200).json({ message: 'Employee updated successfully', success: true, data: employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', success: false, error: error.message });
  }
};

// Delete an Employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }

    res.status(200).json({ message: 'Employee deleted successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', success: false, error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
