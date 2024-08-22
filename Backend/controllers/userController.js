const User=require("../models/User");
const bcrypt=require("bcryptjs");

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user=await User.findById(id);
    if(user){
      
      res.status(200).json(user);
    }else{
      res.status(404).json({message:"User not found"});
    }
  } catch(error) {
    res.status(500).json({message:"Error fetching user",error:error});
  }
};


exports.getUsers=async(req,res)=>{
  try {
    const users=await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message:"Error fetching users",error:error});
  }
}

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user = await User.findByIdAndUpdate(
      id,
      {
        ...(updates.username && { username: updates.username }),
        ...(updates.email && { email: updates.email }),
        ...(updates.bio && { bio: updates.bio || "" }),
        ...(updates.location && { location: updates.location || "" }),
      },
      { new: true }
    );

    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error });
  }
};

exports.editUserPassword=async(req,res)=>{
  const { id } = req.params;
  const updates = req.body;

  let user=await User.findById(id);
  // console.log(1,user.password);
  // console.log(1,updates.password);
  
  if (updates.password) {
    
    const comparePassword=await bcrypt.compare(updates.password,user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(updates.newPassword, 12);
    updates.newPassword = hashedPassword;
    
    
  }
  try {
  user = await User.findByIdAndUpdate(
    id,
    {
      password: updates.newPassword },
    { new: true }
  );
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error });
  }
}