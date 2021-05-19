const express = require("express");
const mongoose = require("mongoose");
require("../models/photos.js");
const Photos = mongoose.model("Photos");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addPhotos/:type", multer, (req, res) => {
  console.log("reqbody", req.body);
  console.log("FILE", req.file);
  if (
    req.body.categorie != "" &&
    req.body.sous_categorie != "" &&
    req.body.src != "undefined" &&
    req.body.alt != ""
  ) {
    let photo = new Photos({
      alt: req.body.alt,
      src: req.file.filename,
      categorie: req.body.categorie,
      sous_categorie: req.body.sous_categorie,
    });
    console.log("photo", photo);
    photo.save((err) => {
      if (err) return handleErro(err);
      res.status(200).send("photo enregistré");
    });
  } else {
    res.status(500).send("Il manque un element");
  }
});

module.exports = router;
