const { pool } = require("../config/db");

class Catalog {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    return rows[0];
  }
}

module.exports = Catalog;