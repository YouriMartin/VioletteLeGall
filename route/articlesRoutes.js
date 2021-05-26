const express = require("express");
const mongoose = require("mongoose");
require("../models/articles.js");
const Articles = mongoose.model("Articles");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const fs = require("fs");
const router = express.Router();

router.post("/addArticle/:type", auth, multer, (req, res) => {
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

router.get("/getOne/:id", (req, res) => {
  console.log("param", req.params);
  Articles.findById(req.params.id, function (err, photo) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(photo);
    }
  });
});

router.post("/delete", auth, (req, res) => {
  // console.log(req.body);
  Articles.findOne({ _id: req.body.id })
    .then((article) => {
      //console.log(article.img.src);
      const filename = article.img.src;
      fs.unlink(`photosBack/Articles/${filename}`, () => {
        Articles.deleteOne({ _id: req.body.id })
          .then(() => res.status(200).send("Article supprimé !"))
          .catch((error) => res.status(500).send(error));
      });
    })
    .catch((error) => res.status(500).send(error));
});

router.post("/update", auth, (req, res) => {
  console.log(req.body);
  Articles.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { titre: req.body.titre, texte: req.body.texte } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Article modifier");
      }
    }
  );
});
module.exports = router;
