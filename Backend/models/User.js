const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  bio:{
    type:String
  },
  location:{
    type:String
  },
});

// Pre-save middleware to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Hash the password with a salt rounds value of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    console.log(this.password);
    
    next();
  } catch (err) {
    next(err);
  }
});


// Instance method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports=mongoose.model("User",userSchema);
