require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function seedAdmin() {
  try {
    const email = process.env.ADMIN_MAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!process.env.MONGODB_URI || !email || !password) {
      throw new Error("Missing MongoDB or admin credentials in .env");
    }

    if (password.length < 8) {
      throw new Error("Admin password must be at least 8 characters");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Account already exists:", email);
      console.log("No changes made. Check the existing account.");
      return;
    }

    const admin = await User.create({
      name: "Campus Administrator",
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "admin"
    });

    console.log("Admin account created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();