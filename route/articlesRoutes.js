const express = require("express");
const mongoose = require("mongoose");
require("../models/articles.js");
const Articles = mongoose.model("Articles");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addArticle/:type", multer, (req, res) => {
  //console.log("reqbody", req.body);
  console.log("FILE", req.file);
  if (
    req.body.titre != "" &&
    req.body.texte != "" &&
    req.body.date != "" &&
    req.body.src != "undefined" &&
    req.body.alt != ""
  ) {
    let article = new Articles({
      titre: req.body.titre,
      texte: req.body.texte,
      date: req.body.date,
      img: { src: req.file.filename, alt: req.body.alt },
    });
    console.log("article", article);
    article.save((err) => {
      if (err) return handleErro(err);
      res.status(200).send("article enregistré");
    });
  } else {
    res.status(500).send("Il manque un element");
  }
});

router.get("/getAll", (req, res) => {
  Articles.find({}, (err, data) => {
    // console.log(data);
    if (err) {
      res.send("erreur");
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
