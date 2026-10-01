import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// ADD PAYMENT
// ==========================================

router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      member_id,
      membership_id,
      amount,
      payment_method,
    } = req.body;

    if (!member_id || !amount) {
      return res.status(400).json({
        message: "Member ID and amount are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO payments
       (member_id, membership_id, amount, payment_method)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        member_id,
        membership_id,
        amount,
        payment_method,
      ]
    );

    res.status(201).json({
      message: "Payment recorded successfully",
      payment: result.rows[0],
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    res.status(500).json({
      message: error.message,
      detail: error.detail,
    });
  }
});


// ==========================================
// GET PAYMENT HISTORY
// ==========================================

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.member_id,
        p.membership_id,

        m.name AS member_name,
        m.email AS member_email,

        mp.name AS plan_name,

        p.amount,
        p.payment_date,
        p.payment_method,
        p.status

      FROM payments p

      JOIN members m
        ON p.member_id = m.id

      LEFT JOIN member_memberships mm
        ON p.membership_id = mm.id

      LEFT JOIN membership_plans mp
        ON mm.plan_id = mp.id

      ORDER BY p.payment_date DESC, p.id DESC
    `);

    res.status(200).json({
      payments: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// DELETE PAYMENT
// ==========================================

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const existingPayment = await pool.query(
      "SELECT * FROM payments WHERE id = $1",
      [id]
    );

    if (existingPayment.rows.length === 0) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    await pool.query(
      "DELETE FROM payments WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Payment deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;