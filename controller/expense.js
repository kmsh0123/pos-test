const router = require("express").Router();
const { Op } = require("sequelize");
const expenseItem = require("../model/expense");
router.get("/", async (req, res) => {
  try {
    const expense = await expenseItem.findAll();
    return res.status(200).json(expense);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.get("/:id", async (req, res) => {
  const expenseId = req.params.id;
  try {
    const expense = await expenseItem.findOne({ where: { id: expenseId } });
    return res.status(200).json(expense);
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/getExpense", async (req, res) => {
  const { start, end } = req.body;
  // console.log(req.body);
  try {
    let whereClause;
    if(start && end){
      whereClause = {
        createdAt : {
          [Op.gt] : start,
        },
        updatedAt : {
          [Op.lt] : end,
        }
      }
    }else if(start) {
      whereClause = {
        createdAt : {
          [Op.lt] : start
        }
      }
    }
    const expense = await expenseItem.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
    });
    return res.status(200).json(expense);
  } catch (e) {
    // console.log(e.message);
    return res.status(500).json({ msg: "error" });
  }
});
router.post("/", async (req, res) => {
  try {
    await expenseItem.create(req.body);
    return res.status(200).json({ msg: "expense is created" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    await expenseItem.update(req.body, { where: { id: req.body.id } });
    return res.status(200).json({ msg: "expense Updated" });
  } catch (e) {
    console.log(e.message);
  }
});
router.delete("/:id", async (req, res) => {
  const expenseId = req.params.id;
  try {
    await expenseItem.destroy({ where: { id: expenseId } });
    return res.status(200).json({ msg: "expense deleted" });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
