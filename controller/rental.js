const router = require("express").Router();
const rental = require("../model/rental");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
  const Rental = await rental.findAll({ order: [["id", "DESC"]],});
    return res.status(200).json(Rental);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.get("/:id", async (req, res) => {
  const rentalId = req.params.id;
  try {
    const Rental = await rental.findOne({ where: { id: rentalId } });
    return res.status(200).json(Rental);
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/getRental", async (req, res) => {
  const { start, end } = req.body;
  // console.log(req.body);
  try {
    let whereClause = {}
    if(start && end){
      whereClause ={
        createdAt : {
          [Op.gt] :start
        },
        updatedAt : {
          [Op.lt] :end
        }
      }
    }else if(start){
      whereClause = {
        createdAt : {
          [Op.lt] :start
        }
      }

    }
    const Rental = await rental.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
    });
    return res.status(200).json(Rental);
  } catch (e) {
    // console.log(e.message);
    return res.status(500).json({ msg: "error" });
  }
});


router.post("/", async (req, res) => {
  try {
    await rental.create(req.body);
    return res.status(200).json({ msg: "rental is created" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    await rental.update(req.body, { where: { id: req.body.id } });
    return res.status(200).json({ msg: "rental Updated" });
  } catch (e) {
    console.log(e.message);
  }
});
router.delete("/:id", async (req, res) => {
  const rentalId = req.params.id;
  try {
    await rental.destroy({ where: { id: rentalId } });
    return res.status(200).json({ msg: "expense deleted" });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
