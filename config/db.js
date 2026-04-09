const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const initDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    });

    console.log(`✅ Database '${databaseName}' ready!`);

    await connection.end();
    console.log("✅ MySQL Connected & Pool Ready");
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1);
  }
};

module.exports = { pool, initDB };
