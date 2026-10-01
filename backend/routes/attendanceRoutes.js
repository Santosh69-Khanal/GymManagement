import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();


// Mark attendance
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { member_id } = req.body;

    if (!member_id) {
      return res.status(400).json({
        message: "Member ID is required",
      });
    }

    const existingAttendance = await pool.query(
      `SELECT *
       FROM attendance
       WHERE member_id = $1
       AND attendance_date = CURRENT_DATE`,
      [member_id]
    );

    if (existingAttendance.rows.length > 0) {
      return res.status(400).json({
        message: "Member has already checked in today",
      });
    }

    const result = await pool.query(
      `INSERT INTO attendance
       (member_id, attendance_date, check_in_time)
       VALUES ($1, CURRENT_DATE, CURRENT_TIME)
       RETURNING *`,
      [member_id]
    );

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance: result.rows[0],
    });

  } catch (error) {
    console.error("ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Get all attendance
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.member_id,
        m.name AS member_name,
        m.email AS member_email,
        a.attendance_date,
        a.check_in_time
      FROM attendance a
      JOIN members m
        ON a.member_id = m.id
      ORDER BY a.attendance_date DESC,
               a.check_in_time DESC
    `);

    res.status(200).json({
      attendance: result.rows,
    });

  } catch (error) {
    console.error("ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;