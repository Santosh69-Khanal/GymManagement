import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gym_management",
  password: "123456789",
  port: 5432,
});

export default pool;