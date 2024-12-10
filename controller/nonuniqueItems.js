const router = require("express").Router();
const { upload, deleteFile } = require("../component/gallery");
const Category = require("../model/category");
const nonuniqueItem = require("../model/nonuniqueItems");
const Promotion = require("../model/promotion");
// const { Op } = require("sequelize");
// get all non unique item
router.get("/", async (req, res) => {
  try {
    const nonuniqueItems = await nonuniqueItem.findAll({
      order: [["id", "DESC"]],
      include: [Category,Promotion],
    });
    return res.json(nonuniqueItems);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});

//get a single non unique item
router.get("/:id", async (req, res) => {
  const nonUniqueId = req.params.id;

  try {
    const nonUniqueItem = await nonuniqueItem.findOne({
      where: { id: nonUniqueId },
    });

    return res.json(nonUniqueItem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get pagination

// router.get("/", async (req, res) => {});

// add non unique item
router.post("/", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  let {
    name,
    sale_price,
    purchase_price,
    categoryId,
    note,
    quantity,
    discount,
    minQty,
    lost,
    expiredDate,
  } = req.body;
  const salePrice = sale_price - discount;
  // console.log(salePrice);
  sale_price = salePrice;
  const tQuantity = quantity - lost;
  quantity = tQuantity;
  try {
    await nonuniqueItem.create({
      name,
      sale_price,
      purchase_price,
      categoryId,
      note,
      quantity,
      discount,
      image: req.file.filename,
      minQty,
      lost,
      expiredDate,
    });
    return res.status(200).json({ msg: "Non unique Item has been created" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//update non unique item
router.put("/:id", upload.single("image"), async (req, res) => {
  // const nonUniqueId = req.params.id;
  // const { name, price, image, quantity, note, categoryId } = req.body;
  console.log(req.body);
  let {
    id,
    name,
    sale_price,
    purchase_price,
    category,
    note,
    quantity,
    discount,
    minQty,
    lost,
    expiredDate,
  } = req.body;
  const nonUniquId = id;
  const salePrice = sale_price - discount;
  sale_price = salePrice;
  const tQuantity = quantity - lost;
  quantity = tQuantity;
  try {
    if (req.file) {
      const nonUniqueItem = await nonuniqueItem.findOne({
        where: { id: nonUniquId },
      });
      await deleteFile(nonUniqueItem.dataValues.image);

      await nonuniqueItem.update(
        {
          name,
          sale_price,
          purchase_price,
          category,
          note,
          quantity,
          discount,
          image: req.file.filename,
          minQty,
          lost,
          expiredDate,
        },
        { where: { id: nonUniquId } }
      );
    } else {
      await nonuniqueItem.update(
        {
          name,
          sale_price,
          purchase_price,
          category,
          note,
          quantity,
          discount,
          minQty,
          lost,
          expiredDate,
        },
        { where: { id: nonUniquId } }
      );
    }

    return res.status(200).json({ msg: "Non Unique Item has been updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete non unique item
router.delete("/:id", async (req, res) => {
  const nonUniqueId = req.params.id;

  try {
    const nonUniqueItem = await nonuniqueItem.findOne({
      where: { id: nonUniqueId },
    });
    await deleteFile(nonUniqueItem.dataValues.image);

    await nonuniqueItem.destroy({ where: { id: nonUniqueId } });
    return res.status(200).json({ msg: "Non Unique Item has been deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
