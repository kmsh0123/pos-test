const router = require("express").Router();
const Category = require("../model/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const singlecategory = await Category.findOne({
      where: { id: categoryId },
    });
    return res.json(singlecategory);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    await Category.create(req.body);
    return res.status(200).json({ msg: "Category is created" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log("id", req.params.id);
    const categoryId = req.params.id;
    await Category.update(req.body, { where: { id: categoryId } });
    return res.status(200).json({ msg: "Category has been updated" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.destroy({ where: { id: categoryId } });
    return res.status(200).json({ msg: "Category has been deleted" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
