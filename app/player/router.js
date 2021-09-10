var express = require("express");
var router = express.Router();
const {isLoginPlayer} = require("../middleware/auth");

const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
} = require("./controller");

/* GET home page. */
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detail", detailPage);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/history", isLoginPlayer, history);

module.exports = router;
