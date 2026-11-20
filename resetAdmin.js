require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function resetAdmin() {
  try {
    const email = process.env.ADMIN_MAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!process.env.MONGODB_URI || !email || !password) {
      throw new Error("Missing environment variables");
    }

    if (password.length < 12) {
      throw new Error("Use an admin password of at least 12 characters");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Admin account not found");
    }

    if (user.role !== "admin") {
      throw new Error("Account does not have admin role");
    }

    user.passwordHash = await bcrypt.hash(password, 12);
    await user.save();

    console.log("Admin password reset successfully");
    console.log("Admin role:", user.role);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetAdmin();