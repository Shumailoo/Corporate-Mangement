const dotenv = require("dotenv");
const mongoose=require("mongoose");

// Configure dotenv to load variables from .env file
dotenv.config();

const db_url=process.env.DB_URL || "mongodb://127.0.0.1:27017/corprmgt";
const mongoDbConnect=async()=>{
  try {
    await mongoose.connect(db_url);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Database connection Error");
  }
  
}

module.exports=mongoDbConnect;