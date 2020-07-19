const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file_controller");

router.post("/upload", fileController.uploadCSV);
router.get("/file/:id", fileController.openFile);
router.get("/", fileController.getFile);

module.exports = router;
