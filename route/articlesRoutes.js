const express = require("express");
const mongoose = require("mongoose");
require("../models/articles.js");
const Articles = mongoose.model("Articles");
const multer = require("../middleware/multer");
const router = express.Router();

router.post("/addArticle", multer, (req, res) => {
  console.log("reqbody", req.file);
  let article = new Articles({
    titre: req.body.titre,
    texte: req.body.texte,
    date: req.body.date,
    src: req.body.filename,
    alt: req.body.alt,
  });
  console.log("article", article);
  article.save((err) => {
    if (err) return handleErro(err);

    res.status(200).send("article enregistré");
  });
});

module.exports = router;
