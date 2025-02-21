const express = require('express');
const ConnectDb = require('./db')
const cors = require('cors')
require('dotenv').config();  


//for api docs
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

//Routes
const employeeRoutes = require('./routes/employeeRoutes'); 
const leaveRoutes = require('./routes/leaveRoutes'); 
const attendanceRoutes = require('./routes/attendanceRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//API DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/employees', employeeRoutes); 
app.use('/api/att', attendanceRoutes); 
app.use('/api/leave', leaveRoutes); 
app.use('/api/auth', authRoutes); 

//server start from here
ConnectDb().then(
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
)
