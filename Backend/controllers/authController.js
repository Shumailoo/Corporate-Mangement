const User=require("../models/User");

exports.signUp= async(req,res,next)=>{
  try{
    const { username,email,password } =req.body;
    const user=new User({username,email,password});
    await user.save();
    req.session.userId=user._id;
    res.status(201).json({message:"User registered success"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

exports.logIn=async(req,res,next)=>{
  // console.log(req);
  
  const {email,password}=req.body;
  // console.log(email,password);
  
  try {
    const user=await User.findOne({email});
    // console.log(user);
    
    if(!user|| !(await user.comparePassword(password))){
      return res.status(401).json({message:"Invalid cerdentials"});
    }
    req.session.userId=user._id;
    
    res.status(200).json({message:"Logged in success"})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

exports.logOut=(req,res,next)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).json({message:"Failed to logout"});
    } 
    
    res.clearCookie("connect.sid");
    res.status(200).json({message:"Logged out success"});
  });
}