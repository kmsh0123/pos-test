const router = require("express").Router();
const uniqueItem = require("../model/uniqueItems");
const { Op } = require("sequelize");
const { upload, deleteFile } = require("../component/gallery");

//get all unique items
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5; // Number of items per page
  const offest = (page - 1) * perPage;
  try {
    const uniqueItems = await uniqueItem.findAll({
      order: [["id", "DESC"]],
      offest,
    });
    return res.json(uniqueItems);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get single unique item
router.get("/:id", async (req, res) => {
  try {
    const uniqueId = req.params.id;
    const unique_Item = await uniqueItem.findOne({ where: { id: uniqueId } });
    return res.json(unique_Item);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//add unique item
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  let { name, sale_price, purchase_price, category, note, owner, discount } =
    req.body;
  let saleprice = sale_price - discount;
  console.log(saleprice);
  sale_price = saleprice;
  // console.log(sale_price);
  try {
    await uniqueItem.create({
      name,
      sale_price,
      purchase_price,
      category,
      note,
      owner,
      discount,
      image: req.file.filename,
    });
    return res.status(200).json({ msg: "Unique item has been created" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});

//update unique item
router.put("/:id", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  let {
    id,
    name,
    sale_price,
    purchase_price,
    category,
    note,
    owner,
    discount,
  } = req.body;
  // console.log(id, "this important");
  const uniqueId = id;
  const salePrice = sale_price - discount;
  sale_price = salePrice;
  // console.log(salePrice);
  try {
    // const uniqueId = req.body.id;
    // console.log("id----", uniqueId);
    // console.log(req.body);

    if (req.file) {
      // for delete image
      const unique_Item = await uniqueItem.findOne({
        where: { id: uniqueId },
      });
      await deleteFile(unique_Item.dataValues.image);

      // for update unique item

      await uniqueItem.update(
        {
          name,
          sale_price,
          purchase_price,
          category,
          note,
          owner,
          discount,
          image: req.file.filename,
        },
        { where: { id: uniqueId } }
      );
    } else {
      await uniqueItem.update(
        { name, sale_price, purchase_price, category, owner, discount, note },
        { where: { id: uniqueId } }
      );
    }
    return res.status(200).json({ msg: "Unique Items has been updated" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//delete unique item
router.delete("/:id", async (req, res) => {
  const uniqueId = req.params.id;

  try {
    const unique_Item = await uniqueItem.findOne({ where: { id: uniqueId } });
    await deleteFile(unique_Item.dataValues.image);

    await uniqueItem.destroy({ where: { id: uniqueId } });
    return res.status(200).json({ msg: "Unique item has been deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});

module.exports = router;
