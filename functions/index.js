const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");

const app = express();
app.use(
  cors({
    origin: ["https://cryptoprism.io", "https://www.cryptoprism.io"],
  })
);
app.use(express.json());

// Limit each IP to 5 signup attempts per 15 minutes to curb spam/abuse of
// the early_access_signups table.
const earlyAccessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  max: 3,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

app.post("/api/early-access", earlyAccessLimiter, async (req, res) => {
  const { name, email, experience } = req.body;

  // Honeypot: the frontend form should include a hidden field named
  // "website" that real users never see or fill in (kept empty/absent via
  // CSS, e.g. visually hidden off-screen). If it's present and non-empty,
  // treat the submission as a bot and silently discard it — return the
  // normal success shape without touching the database so the bot can't
  // tell it was filtered out.
  const honeypot = req.body.website;
  if (honeypot && String(honeypot).trim() !== "") {
    return res.status(200).json({
      success: true,
      message: "You're on the list!",
      isNew: true,
    });
  }

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
