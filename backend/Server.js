import cors from "cors";
import express from "express";
import pool from "./db.js";
import memberRoutes from "./routes/memberRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import memberDashboardRoutes from "./routes/memberDashboardRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/members", memberRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/member-dashboard", memberDashboardRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("Gym Management Backend is running!");
});


// Test database
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});





app.listen(5000, () => {
  console.log("Server running on port 5000");
});