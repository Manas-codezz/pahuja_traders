const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const updatePassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hash = await bcrypt.hash("admin123", 10);
    const result = await User.updateOne(
      { email: "admin@rankmycv.com" },
      { password: hash },
    );
    if (result.modifiedCount > 0) {
      console.log("Password updated for admin@rankmycv.com");
    } else {
      console.log("User not found or password same");
    }
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

updatePassword();
