var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");

const {
  index,
  viewCreate,
  actionCreate,
  // viewEdit,
  // acctionUpdate,
  // acctionDel,
} = require("./controller");

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({dest: os.tmpdir()}).single("image"),
  actionCreate,
);
// router.get("/edit/:id", viewEdit);
// router.put("/update/:id", acctionUpdate);
// router.delete("/del/:id", acctionDel);

module.exports = router;
