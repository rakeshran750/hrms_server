const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const authMiddleware = require('../middleware/authMiddleware')


// Create a new Employee
router.post('/', employeeController.createEmployee);

// Get all Employees
router.get('/',authMiddleware, employeeController.getAllEmployees);

// Get a specific Employee by ID
router.get('/account',authMiddleware, employeeController.getEmployeeById);


// Update an Employee by ID
router.put('/:id', employeeController.updateEmployee);

// Delete an Employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
