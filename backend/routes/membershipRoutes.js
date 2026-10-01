import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================
// GET ALL MEMBERSHIP PLANS
// =====================================================

router.get("/plans", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM membership_plans ORDER BY id ASC"
    );

    res.status(200).json({
      plans: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// ASSIGN MEMBERSHIP TO MEMBER
// =====================================================

router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      member_id,
      plan_id,
      start_date,
      end_date
    } = req.body;

    if (!member_id || !plan_id || !end_date) {
      return res.status(400).json({
        message: "Member, plan and end date are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO member_memberships
       (member_id, plan_id, start_date, end_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        member_id,
        plan_id,
        start_date || new Date().toISOString().split("T")[0],
        end_date
      ]
    );

    res.status(201).json({
      message: "Membership assigned successfully",
      membership: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// GET ALL MEMBER MEMBERSHIPS
// =====================================================

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        mm.id,
        mm.member_id,
        mm.plan_id,
        m.name AS member_name,
        m.email AS member_email,
        mp.name AS plan_name,
        mp.price,
        mm.start_date,
        mm.end_date,
        mm.status
      FROM member_memberships mm
      JOIN members m ON mm.member_id = m.id
      JOIN membership_plans mp ON mm.plan_id = mp.id
      ORDER BY mm.id ASC
    `);

    res.status(200).json({
      memberships: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// DELETE MEMBER MEMBERSHIP
// =====================================================

router.delete("/:id", authenticateToken, async (req, res) => {
  const client = await pool.connect();

  try {
    const membershipId = Number(req.params.id);

    if (!membershipId) {
      return res.status(400).json({
        message: "Invalid membership ID",
      });
    }

    await client.query("BEGIN");


    // First delete payments connected to this membership
    await client.query(
      `DELETE FROM payments
       WHERE membership_id = $1`,
      [membershipId]
    );


    // Then delete the membership
    const result = await client.query(
      `DELETE FROM member_memberships
       WHERE id = $1
       RETURNING *`,
      [membershipId]
    );


    if (result.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Membership not found",
      });
    }


    await client.query("COMMIT");

    res.status(200).json({
      message: "Membership deleted successfully",
      membership: result.rows[0],
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("DELETE MEMBERSHIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });

  } finally {
    client.release();
  }
});


export default router;