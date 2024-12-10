const router = require("express").Router();
const Order = require("../model/order");
const nonuniqueItem = require("../model/nonuniqueItems");
const uniqueItem = require("../model/uniqueItems");
const orderHistory = require("../model/orderhistory");
const { Op } = require("sequelize");
// const { printingItem } = require("../component/print");

const zeroPad = (num, places) => String(num).padStart(places, "0");

const getRandomId = (min = 0, max = 50000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().padStart(6, "0");
};
router.get("/", async (req, res) => {
  try {
    await Order.findAll({ include: orderHistory });
    return res.status(200).json({ msg: "ok" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
// to get data for report
// router.post("/getOrders", async (req, res) => {
//   const { start, end } = req.body;

//   try {
//     const order = await Order.findAll({
//       where: {
//         createdAt: {
//           [Op.gt]: start,
//         },
//         updatedAt: {
//           [Op.lt]: end,
//         },
//       },
//       order: [["id", "DESC"]],
//       include: orderHistory,
//     });
//     return res.json(order);
//   } catch (e) {
//     console.log(e.message);
//     return res.status(500).json({ message: e.message });
//   }
// });
router.post("/getOrders", async (req, res) => {
  const { start, end } = req.body;
  console.log(start)
  console.log(end)

  try {
    let whereClause = {};

    if (start && end) {
      whereClause = {
        createdAt: {
          [Op.gt]: start,
        },
        updatedAt: {
          [Op.lt]: end,
        },
      };
    } else if (start) {
      whereClause = {
        createdAt: {
          [Op.lt]: start,
        },
      };
    }

    const order = await Order.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
      include: orderHistory,
    });
    // console.log(order)

    return res.json(order);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
});


// to store data in order and order detial database
router.post("/", async (req, res) => {
  const { payamount, grandtotal, payback, discount, data } = req.body;
  console.log(data);
  let orderData, invoice;

  try {
    orderData = await Order.create({
      payamount,
      grandtotal,
      payback,
      discount,
    });

    invoice = "MULA" + zeroPad(orderData.dataValues.id, 4);

    await Order.update(
      { invoice_no: invoice },
      { where: { id: orderData.dataValues.id } }
    );
  } catch (err) {
    res.status(500).json({ error: 1, msg: err.message });
  }

  data.forEach(async (d) => {
    console.log(d);
    let promotionPrice;
    if (d.promotionId === null) {
      promotionPrice = d.sale_price;
    } else {
      promotionPrice = d.sale_price - (d.sale_price * d.promotion?.promotionValue / 100);
    }

    console.log(promotionPrice);
    try {
     const data = await orderHistory.create({
        product_name: d.name,
        price: promotionPrice,
        quantity: d.qty,
        Purchase: d.purchase_price,
        orderId: orderData.dataValues.id,
      });
      console.log(data)

      // check unique & non-unique
      if (!d.checkUnique) {
        await nonuniqueItem.update(
          { quantity: d.quantity - d.qty },
          { where: { id: d.id } }
        );
      } else {
        await uniqueItem.update(
          { quantity: d.quantity - d.qty },
          { where: { id: d.id } }
        );
      }
    } catch (err) {
      res.status(500).json({ error: 2, msg: err.message });
    }
  });

  // await printingItem(data, orderData, invoice);

  res.status(200).json({ msg: "Order Success" });
});
module.exports = router;
