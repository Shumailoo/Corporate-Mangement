const User=require("../models/User");

exports.signUp= async(req,res,next)=>{
  try{
    const { username,email,password } =req.body;
    
    const matchUser=await User.findOne({email});
    if(matchUser){
      return res.status(409).json({messageTitle:"User Already Exists",message:"These credentials are already associated with an account. Please use a different credentials."});
    }
    const user=new User({username,email,password});
    await user.save();
    res.status(201).json({messageTitle:"User Created Successfully",message:"You've taken the first step to an amazing journey! Log in now and explore!"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

exports.logIn=async(req,res,next)=>{
  // console.log(req);
  
  const {email,password}=req.body;
  // console.log(11,req.body);
  
  try {
    const user=await User.findOne({email:email});
    // console.log(user);
    
    if(!user|| !(await user.comparePassword(password))){
      return res.status(401).json({messageTitle:"Authentication Failed",message:"We couldn't verify your account. Check your email and password and try again."});
    }
    req.session.userId=user._id;
    req.session.isVerified=true;
    // console.log(req.session);
    
    res.status(200).json({messageTitle:"Welcome Back!",message:"We're delighted to see you again! You're all set to shine.",user:{
      _id:user._id,
      username:user.username,
      email:user.email,
      bio:user.bio,
      location:user.location,
    }})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

exports.logInStatus=async(req,res,next)=>{
  if(req.session.isVerified){
    const user=await User.findById(req.session.userId);
    return res.status(200).json({messageTitle:"User Authenticated",message:"User is authenticated",isAuthenticated:true,user:user});
  }
  res.status(401).json({messageTitle:"User Not Authenticated",message:"User is not authenticated",isAuthenticated:false});
}

exports.logOut=(req,res,next)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).json({message:"Failed to logout"});
    } 
    res.clearCookie("sessionCookie");
    res.status(200).json({message:"Logged out success"});
  });
}