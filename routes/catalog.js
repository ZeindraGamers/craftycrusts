const express = require("express");
const router = express.Router();
const Catalog = require("../models/Catalog");

// API ambil semua produk
router.get("/all", async (req, res) => {
  try {
    const products = await Catalog.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Gagal narik data katalog" });
  }
});

// API ambil by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Catalog.getById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data" });
  }
});

module.exports = router;