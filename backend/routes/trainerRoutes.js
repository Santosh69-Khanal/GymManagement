import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// ADD TRAINER
// ==========================================

router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      specialization,
      experience_years,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO trainers
       (name, email, phone, specialization, experience_years)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        email,
        phone || "",
        specialization || "",
        experience_years || 0,
      ]
    );

    res.status(201).json({
      message: "Trainer added successfully",
      trainer: result.rows[0],
    });

  } catch (error) {
    console.error("ADD TRAINER ERROR:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "A trainer with this email already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });
  }
});


// ==========================================
// GET ALL TRAINERS
// ==========================================

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM trainers
       ORDER BY id ASC`
    );

    res.status(200).json({
      trainers: result.rows,
    });

  } catch (error) {
    console.error("GET TRAINERS ERROR:", error);

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });
  }
});


// ==========================================
// UPDATE TRAINER
// ==========================================

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      specialization,
      experience_years,
      status,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const result = await pool.query(
      `UPDATE trainers
       SET
         name = $1,
         email = $2,
         phone = $3,
         specialization = $4,
         experience_years = $5,
         status = $6
       WHERE id = $7
       RETURNING *`,
      [
        name,
        email,
        phone || "",
        specialization || "",
        experience_years || 0,
        status || "active",
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      message: "Trainer updated successfully",
      trainer: result.rows[0],
    });

  } catch (error) {
    console.error("UPDATE TRAINER ERROR:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "A trainer with this email already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });
  }
});


// ==========================================
// DELETE TRAINER
// ==========================================

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM trainers
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      message: "Trainer deleted successfully",
      trainer: result.rows[0],
    });

  } catch (error) {
    console.error("DELETE TRAINER ERROR:", error);

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });
  }
});


export default router;