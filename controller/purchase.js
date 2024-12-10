const router = require("express").Router();
const nonuniqueItem = require("../model/nonuniqueItems");
const Purchase = require("../model/purchase");
const { Op } = require("sequelize");

const zeroPad = (num, place) => String(num).padStart(place, 0);

router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ order: [["id", "DESC"]] });

    return res.status(200).json(purchases);
  } catch (e) {
    return res.status(500).json(e);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findOne({ where: { id: purchaseId } });
    return res.status(200).json(purchase);
  } catch (e) {
    return res.status(500).json(e);
  }
});
router.post("/getPurchase", async (req, res) => {
  const { start, end } = req.body;
  console.log(start, end, "purchase");
  try {
    let whereClause ;
    if ( start && end){
      whereClause = {
        createdAt : {
          [Op.gt] : start,
        },
        updatedAt : {
          [Op.lt] : end
        }
      }
    }else if(start){
      whereClause = {
        createdAt : {
          [Op.lt] :start
        }
      }
    }
    const purchase = await Purchase.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
    });
    return res.status(200).json(purchase);
  } catch (e) {
    return res.status(500).json({ msg: e.massage });
  }
});
router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(data.totalAmount, data.product);
  let invoice;
  try {
    const purchaseData = await Purchase.create({
      purchaseDate: data.purchaseDate,
      totalAmount: data.totalAmount,
      supplierId: data.supplierId,
      productData: JSON.stringify(data.product),
    });

    invoice = "MULA" + zeroPad(purchaseData.dataValues.id, 4);
    await Purchase.update(
      { invoice_no: invoice },
      { where: { id: purchaseData.dataValues.id } }
    );

    for (let d of data.product) {
      try {
        const existingItem = await nonuniqueItem.findOne({
          where: { id: d.id },
        });
        console.log(existingItem);
        await nonuniqueItem.update(
          {
            quantity: existingItem.quantity + d.quantity,
            purchase_price: d.purchase_price,
          },
          { where: { id: d.id } }
        );
      } catch (e) {
        return res.status(500).json(e);
      }
    }
    return res.status(200).json({ msg: "order success" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
