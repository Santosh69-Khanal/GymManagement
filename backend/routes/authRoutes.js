import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

const JWT_SECRET = "gym_management_secret";


// ==========================================
// REGISTER USER
// ==========================================

router.post("/register", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    // Check if email already exists
    const existingUser = await client.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Start transaction
    await client.query("BEGIN");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await client.query(
      `INSERT INTO users
       (name, email, password, role)
       VALUES ($1, $2, $3, 'member')
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    const user = newUser.rows[0];


    // ==========================================
    // CREATE MEMBER RECORD
    // ==========================================

    await client.query(
      `INSERT INTO members
       (name, email, phone, membership_type, join_date, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        name,
        email,
        "",
        "None",
        new Date().toISOString().split("T")[0],
        "inactive",
      ]
    );


    // Save both changes
    await client.query("COMMIT");

    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });

  } finally {

    client.release();

  }
});


// ==========================================
// LOGIN USER
// ==========================================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }


    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE LOWER(email) = LOWER($1)`,
      [email]
    );


    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }


    const user = result.rows[0];


    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }


    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );


    res.status(200).json({

      message: "Login successful",

      token: token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });


  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });

  }
});


// ==========================================
// GET PROFILE
// ==========================================

router.get("/profile", authenticateToken, async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        role
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    res.status(200).json({
      message: "Profile accessed successfully",
      user: result.rows[0],
    });


  } catch (error) {

    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });

  }
});


// ==========================================
// UPDATE PROFILE
// ==========================================

router.put("/profile", authenticateToken, async (req, res) => {
  try {

    const { name, email } = req.body;


    // Check required fields
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }


    // Check if another user already uses this email
    const existingUser = await pool.query(
      `SELECT id
       FROM users
       WHERE LOWER(email) = LOWER($1)
       AND id != $2`,
      [email, req.user.id]
    );


    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email is already being used by another account",
      });
    }


    // Update user
    const result = await pool.query(
      `UPDATE users
       SET
         name = $1,
         email = $2
       WHERE id = $3
       RETURNING id, name, email, role`,
      [
        name,
        email,
        req.user.id,
      ]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });


  } catch (error) {

    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });

  }
});


export default router;