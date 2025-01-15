const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Utility function to validate password strength
const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

app.post("/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Validate input fields
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validatePassword(newPassword)) {
    return res.status(400).json({
      message:
        "New password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number",
    });
  }

  try {
    // Step 1: Get the current password hash from the database
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = result.rows[0].password;

    // Step 2: Compare current password with the hash
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Step 3: Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update password in the database
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      newHashedPassword,
      userId,
    ]);

    return res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
