const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const deleteFile = async (filename) => {
  await fs.unlinkSync("./uploads/" + filename);
};

module.exports = { upload, deleteFile };
