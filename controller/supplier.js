const router = require("express").Router();
const Supplier = require("../model/supplier");

router.get("/", async (req, res) => {
  try {
    const supplier = await Supplier.findAll();
    return res.status(200).json(supplier);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.post("/", async (req, res) => {
  try {
    await Supplier.create(req.body);
    return res.status(200).json({ msg: "suppler added" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = router;
