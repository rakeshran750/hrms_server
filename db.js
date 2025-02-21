const mongoose = require('mongoose');
require('dotenv').config();  

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const connecdb = async()=>{
    try{
        await mongoose.connect(DB_URL)
        console.log("Db connected Successfully")
    }catch(err){
        console.log("Db connection error")
    }
}

module.exports = connecdb;

