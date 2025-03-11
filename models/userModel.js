import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide name"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    mobile: {
      type: String,
      required: [true, "Provide mobile number"],
      unique: true,
    },
    agencyNo: {
      type: Number,
      required: [true, "Provide agency number"],
      unique: true,
      index: true,
    },
    centerName: {
      type: Array,
      default: [],
      required: [true, "Provide center name"],
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    refresh_token: {
      type: String,
      default: "",
    },
    last_login_date : {
        type : Date,
        default : ""
    },
  },
  { timestamps: true },
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
