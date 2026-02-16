const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  max: 3,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

app.post("/api/early-access", async (req, res) => {
  const { name, email, experience } = req.body;

  if (!name || !email || !experience) {
    return res.status(400).json({ error: "Missing required fields: name, email, experience" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const validExperiences = ["beginner", "intermediate", "advanced", "professional"];
  if (!validExperiences.includes(experience)) {
    return res.status(400).json({ error: "Invalid experience level" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO early_access_signups (full_name, email, trading_experience, source)
       VALUES ($1, $2, $3, 'website')
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [name.trim(), email.trim().toLowerCase(), experience]
    );

    const isNew = result.rowCount > 0;
    return res.status(200).json({
      success: true,
      message: isNew ? "You're on the list!" : "You're already signed up!",
      isNew,
    });
  } catch (err) {
    console.error("DB insert error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
