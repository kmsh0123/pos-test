const router = require("express").Router();
const { Op } = require("sequelize");
const Order = require("../model/order");
const orderhistory = require("../model/orderhistory");

// get all non unique item
router.get("/", async (req, res) => {
  try {
    const orderHistory = await orderhistory.findAll();
    return res.json(orderHistory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get a single non unique item
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderItem = await orderhistory.findOne({
      where: { id: orderId },
    });
    return res.json(orderItem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// add non unique item
router.post("/", async (req, res) => {
  try {
    // const { product_name, price, quantity } = req.body;
    await orderhistory.create(req.body);
    return res.status(200).json({ msg: "Non unique Item has been created" });
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/getItems", async (req, res) => {
  const { start, end } = req.body;
  console.log(start, "hello");
  console.log(end, "end")
  try {
    let whereClause;
    if(start && end){
      whereClause = {
        createdAt : {
          [Op.gt] : start,
        },updatedAt : {
          [Op.lt] :end
        }
      }
    }  else if (start) {
      whereClause = {
        createdAt: {
          [Op.lt]: start,
        },
      };
    }
    const order = await orderhistory.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
    });
    return res.json(order);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
});

//update non unique item
router.put("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { product_name, price, quantity } = req.body;

    await orderhistory.update(
      { product_name, price, quantity },
      { where: { id: orderId } }
    );
    return res.status(200).json({ msg: "Non Unique Item has been updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete non unique item
router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    await orderhistory.destroy({ where: { id: orderId } });
    return res.status(200).json({ msg: "Non Unique Item has been deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
