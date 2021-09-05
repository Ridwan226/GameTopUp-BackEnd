var express = require("express");
var router = express.Router();

const {
  index,
  acctionStatus,
  // actionCreate,
  // viewEdit,
  // acctionUpdate,
  // acctionDel,
} = require("./controller");

const {isLoginAdmin} = require("../middleware/auth");
/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);
router.put("/status/:id", acctionStatus);
// router.post("/create", actionCreate);
// router.get("/edit/:id", viewEdit);
// router.put("/update/:id", acctionUpdate);
// router.delete("/del/:id", acctionDel);

module.exports = router;
