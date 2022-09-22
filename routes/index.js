var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "String Theory",
    bannerImgUrl:
      "https://gp1.wac.edgecastcdn.net/802892/http_public_production/artists/images/3941706/original/crop:x0y0w1500h1000/hash:1467518471/1391548992_Bella_s_Bartok_proofs-0042.jpg?1467518471"
  });
});

module.exports = router;
