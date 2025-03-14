import UserModel from "../models/userModel.js";
import bCrypt from "bcryptjs";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/generatedRefreshToken.js";

export async function createUser(req, res) {
  try {
    const { name, mobile, agencyNo, centerName, password, role } = req.body;

    if (!name || !mobile || !agencyNo || !centerName || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        error: true,
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this mobile number already exists",
          error: true,
          success: false,
        });
    }
    const salt = await bCrypt.genSalt(10);
    const hashedPassword = await bCrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      mobile,
      agencyNo,
      centerName,
      password: hashedPassword,
      role: role || "USER",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ mobile });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bCrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Wrong Password", error: true, success: false });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
        updateUser,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}


export async function logoutController(request, response) {
  try {
    const userid = request.userId

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    response.clearCookie("accessToken", cookiesOption)
    response.clearCookie("refreshToken", cookiesOption)

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: ""
    })

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}


export async function allUser(req, res) {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(400).json({
        message: "No users found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "All users fetched successfully",
      users,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
