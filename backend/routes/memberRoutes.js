import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// Add new member
router.post("/", authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { name, email, phone, membership_type } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO members
       (name, email, phone, membership_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, phone, membership_type]
    );

    res.status(201).json({
      message: "Member added successfully",
      member: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "A member with this email already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Get all members
router.get("/", authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM members ORDER BY id ASC"
    );

    res.status(200).json({
      members: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Update a member
router.put("/:id", authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, membership_type, status } = req.body;

    const result = await pool.query(
      `UPDATE members
       SET name = $1,
           email = $2,
           phone = $3,
           membership_type = $4,
           status = $5
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, membership_type, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member updated successfully",
      member: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Delete a member
router.delete("/:id", authenticateToken, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM members WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member deleted successfully",
      member: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;