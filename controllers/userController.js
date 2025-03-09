import UserModel from "../models/userModel.js";

export async function createUser(req, res) {
  try {
    const { name, mobile, agencyNo, centerName, password, role } = req.body;

    
    const existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this mobile number already exists" });
    }

    
    const newUser = new UserModel({
      name,
      mobile,
      agencyNo,
      centerName,
      password, 
      role: role || "USER", 
    });

   
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



export async function loginUser(req, res) {
  try {
    const { mobile, password } = req.body;
    const user = await UserModel.findOne({ mobile });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }

    if (!user.password === password) {
      return res
        .status(400)
        .json({ message: "Wrong Password", error: true, success: false });
    }

    return res.json({
      message: "Login Successful",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
