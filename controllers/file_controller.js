const File = require("../models/csv_file");
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");

module.exports.uploadCSV = function (req, res) {
  try {
    File.uploadedCSVFile(req, res, function (err) {
      if (err) {
        console.log("multer error", err);
        return;
      }
      console.log(req.file);

      if (req.file) {
        File.create({
          filename: File.path + "/" + req.file.filename,
        });
      }
    });
  } catch (error) {
    return res.redirect("back");
  }
};

module.exports.getFile = async function (req, res) {
  const files = await File.find({});
  res.render("home", {
    title: "CSV_files",
    files: files,
  });
};

const results = [];
module.exports.openFile = async function (req, res) {
  const file = await File.findById(req.params.id);
  fs.createReadStream(path.join(__dirname, "..", file.filename))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.render("file", {
        title: "file",
        rows: results.splice(0, 100),
      });
    });
};
