import express from "express";
import pool from "../db.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// GET LOGGED-IN MEMBER DASHBOARD
// ==========================================

router.get("/", authenticateToken, async (req, res) => {
  try {

    // ==========================================
    // GET MEMBER
    // ==========================================

    const memberResult = await pool.query(
      `SELECT *
       FROM members
       WHERE LOWER(email) = LOWER($1)`,
      [req.user.email]
    );

    if (memberResult.rows.length === 0) {
      return res.status(404).json({
        message: "Member record not found",
      });
    }

    const member = memberResult.rows[0];


    // ==========================================
    // GET CURRENT MEMBERSHIP
    // ==========================================

    const membershipResult = await pool.query(
      `SELECT
        mm.id,
        mm.member_id,
        mm.plan_id,

        mp.name AS plan_name,
        mp.price,

        mm.start_date,
        mm.end_date,
        mm.status

       FROM member_memberships mm

       JOIN membership_plans mp
         ON mm.plan_id = mp.id

       WHERE mm.member_id = $1

       ORDER BY
         mm.end_date DESC,
         mm.id DESC

       LIMIT 1`,
      [member.id]
    );

    let membership = null;

    if (membershipResult.rows.length > 0) {

      membership = membershipResult.rows[0];

      // Calculate remaining days
      const today = new Date();
      const endDate = new Date(membership.end_date);

      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const difference =
        endDate.getTime() - today.getTime();

      const daysRemaining =
        Math.ceil(
          difference / (1000 * 60 * 60 * 24)
        );

      membership.days_remaining =
        Math.max(daysRemaining, 0);

      // Determine active status from date
      if (daysRemaining >= 0) {
        membership.is_active = true;
      } else {
        membership.is_active = false;
      }
    }


    // ==========================================
    // GET PAYMENTS
    // ==========================================

    const paymentResult = await pool.query(
      `SELECT
        p.id,
        p.amount,
        p.payment_date,
        p.payment_method,
        p.status,

        mp.name AS plan_name

       FROM payments p

       LEFT JOIN member_memberships mm
         ON p.membership_id = mm.id

       LEFT JOIN membership_plans mp
         ON mm.plan_id = mp.id

       WHERE p.member_id = $1

       ORDER BY
         p.payment_date DESC,
         p.id DESC`,
      [member.id]
    );


    // ==========================================
    // GET ALL ATTENDANCE
    // ==========================================

    const attendanceResult = await pool.query(
      `SELECT
        id,
        attendance_date,
        check_in_time

       FROM attendance

       WHERE member_id = $1

       ORDER BY
         attendance_date DESC,
         check_in_time DESC`,
      [member.id]
    );


    // ==========================================
    // GET THIS WEEK'S ATTENDANCE
    // ==========================================

    const weeklyAttendanceResult = await pool.query(
      `SELECT COUNT(*) AS count

       FROM attendance

       WHERE member_id = $1

       AND attendance_date >=
         date_trunc('week', CURRENT_DATE)

       AND attendance_date <
         date_trunc('week', CURRENT_DATE) + INTERVAL '7 days'`,
      [member.id]
    );

    const weeklyVisits =
      Number(weeklyAttendanceResult.rows[0].count);


    // ==========================================
    // GET TODAY'S ATTENDANCE
    // ==========================================

    const todayAttendanceResult = await pool.query(
      `SELECT COUNT(*) AS count

       FROM attendance

       WHERE member_id = $1

       AND attendance_date = CURRENT_DATE`,
      [member.id]
    );

    const todayVisits =
      Number(todayAttendanceResult.rows[0].count);


    // ==========================================
    // SEND DASHBOARD DATA
    // ==========================================

    res.status(200).json({

      member: member,

      membership: membership,

      payments: paymentResult.rows,

      attendance: attendanceResult.rows,

      stats: {
        total_visits: attendanceResult.rows.length,
        weekly_visits: weeklyVisits,
        today_visits: todayVisits,
        total_payments: paymentResult.rows.length,
      },

    });


  } catch (error) {

    console.error(
      "MEMBER DASHBOARD ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
      detail: error.message,
    });

  }
});


export default router;