const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const FILE_PATH = path.join("/uploads");

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    originalName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", FILE_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

fileSchema.statics.uploadedCSVFile = multer({
  storage: storage,
}).single("filename");
fileSchema.statics.filePath = FILE_PATH;

const File = mongoose.model("File", fileSchema);
module.exports = File;
