const jwt = require("jsonwebtoken");
require('dotenv').config()


const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    // Extract token if it starts with 'Bearer'
    const extractedToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    // Verify the token
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    console.log("decoded items is")
    console.log(decoded)
 
      
    // Attach employee_id to request object
    req.user = { employee_id: decoded.id };

    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
