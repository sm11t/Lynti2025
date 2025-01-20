const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Client Setup
const client = new Client({
  connectionString:
    "postgresql://neondb_owner:password@ep-old-cherry-a6j5tvv7.us-west-2.aws.neon.tech/neondb?sslmode=require",
});

client.connect();

// Get user data
app.get("/get-user-data", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT name, profile_image FROM users WHERE id = $1",
      [1]
    ); // Assuming user with ID 1
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching data");
  }
});

// Update user data
app.post("/update-user", async (req, res) => {
  const { name, profile_image } = req.body;

  try {
    const result = await client.query(
      "UPDATE users SET name = $1, profile_image = $2 WHERE id = $3 RETURNING *",
      [name, profile_image, 1] // Assuming user with ID 1
    );

    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).send("Error saving data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
