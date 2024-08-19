const User=require("../models/User");

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user=await User.find({_id:userId});
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({message:"User not found"});
    }
  } catch(error) {
    res.status(500).json({message:"Error fetching user",error:error});
  }
};
