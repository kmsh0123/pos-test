const router = require("express").Router();
const Sidebar = require("../model/sidebar");
const { upload, deleteFile } = require("../component/gallery");
const SidebarCategory = require("../model/sidebarcategory");

router.get("/", async (req, res) => {
  try {
    const getData = await Sidebar.findAll({ include: SidebarCategory });
    return res.status(200).json(getData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    await Sidebar.create({ ...req.body, image: req.file.filename });
    return res.status(200).json({ msg: " Sidebar is created" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sidebarId = req.params.id;
    const singleData = await Sidebar.findOne({ where: { id: sidebarId } });
    return res.status(200).json(singleData);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  // const sidebarId = req.body.id;
  // console.log(sidebarId, "hello");
  // console.log(req.body);
  try {
    if (req.file) {
      const sidebarData = await Sidebar.findOne({ where: { id: req.body.id } });
      await deleteFile(sidebarData.dataValues.image);
      await Sidebar.update(
        { ...req.body, image: req.file.filename },
        { where: { id: req.body.id } }
      );
    } else {
      await Sidebar.update({ ...req.body }, { where: { id: req.body.id } });
    }
    return res.status(200).json({ msg: " sidebar is updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const sidebarId = req.params.id;
    const SidebarData = await Sidebar.findOne({ where: { id: sidebarId } });
    await deleteFile(SidebarData.dataValues.image);
    await Sidebar.destroy({ where: { id: sidebarId } });
    return res.status(200).json({ msg: "sidebar was deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
