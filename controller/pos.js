const router = require("express").Router();
const nonUnique = require("../model/nonuniqueItems");

router.post("/", async (req, res) => {
  const { qrCode } = req.body;
  let id;

  if (isNaN(Number(qrCode))) {
    id = parseInt(qrCode.slice(4), 10);
  } else {
    id = parseInt(qrCode, 10);
  }
  console.log(id);

  try {
    const nonUniqueItem = await nonUnique.findAll({ where: { id } });

    return res.status(200).json(nonUniqueItem);
  } catch (err) {
    return res.status(500), json({ message: err.message });
  }
});

module.exports = router;
