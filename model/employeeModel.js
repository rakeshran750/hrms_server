// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the Employee Schema
// const employeeSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true
//     },
//     lastName: {
//       type: String,
//       required: true
//     },
//     contact: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     password: {
//       type: String,
//       required:true
//     },
//     base_salary: {
//       type: Number,
//       required: false,
//     },
//     role: {
//       type: String,
//       enum: ['HR', 'Employee'],
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['Active', 'Inactive'],
//       default: 'Active',
//       required: true
//     },
//     aadhar: {
//       type: String,
//       required: true,
//     },
//     pan: {
//       type: String,
//       required: true,
//     },
//     bankAccountNo: {
//       type: String,
//       required: true
//     },
//     emergencyContact: {
//       name: {
//         type: String,
//         required: true
//       },
//       relation: {
//         type: String,
//         required: true
//       },
//       contactNumber: {
//         type: String,
//         required: true
//       }
//     },
//     address: {
//       street: {
//         type: String,
//         required: true
//       },
//       city: {
//         type: String,
//         required: true
//       },
//       state: {
//         type: String,
//         required: true
//       },
//       postalCode: {
//         type: String,
//         required: true
//       }
//     },
//     profilePicLink: {
//       type: String,
//       required: false
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   { timestamps: true }
// );

// // Create the Employee model
// const Employee = mongoose.model('Employee', employeeSchema);
// module.exports = Employee;



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define the Employee Schema
const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    base_salary: { type: Number, default: 0 },
    role: { type: String, enum: ['HR', 'Employee'], required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
    aadhar: { type: String, required: true },
    pan: { type: String, required: true },
    bankAccountNo: { type: String, required: true },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      contactNumber: { type: String, required: true }
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    profilePicLink: { type: String },
  },
  { timestamps: true }
);


// Hash password before saving
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

// Insert sample data
async function insertSampleEmployee() {
  try {
    const existingUser = await Employee.findOne({ email: 'test@gmail.com' });
    if (existingUser) {
      console.log('Test user already exists.');
      return;
    }

    const newEmployee = new Employee({
      firstName: 'Admin',
      lastName: 'HR',
      contact: '9876543210',
      email: 'test@gmail.com',
      password: 'test@123', // This will be hashed
      base_salary: 50000,
      role: 'HR',
      status: 'Active',
      aadhar: '123456789012',
      pan: 'ABCDE1234F',
      bankAccountNo: '1234567890',
      emergencyContact: {
        name: 'Jane Doe',
        relation: 'Sister',
        contactNumber: '9876543211'
      },
      address: {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001'
      },
      profilePicLink: 'https://example.com/profile.jpg'
    });

    await newEmployee.save();
    console.log('Test Employee Inserted Successfully!');
  } catch (error) {
    console.error('Error inserting test employee:', error);
  }
}

// Run the insertion function
insertSampleEmployee();

module.exports = Employee;
