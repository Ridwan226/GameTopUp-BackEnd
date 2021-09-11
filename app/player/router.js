var express = require("express");
var router = express.Router();
const {isLoginPlayer} = require("../middleware/auth");
const multer = require("multer");
const os = require("os");
const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
  dashboard,
  profile,
  editProfile,
} = require("./controller");

/* GET home page. */
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detail", detailPage);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/history", isLoginPlayer, history);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put(
  "/profile/update",
  isLoginPlayer,
  multer({dest: os.tmpdir()}).single("image"),
  editProfile,
);

module.exports = router;
