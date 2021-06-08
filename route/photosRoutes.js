const express = require("express");
const mongoose = require("mongoose");
require("../models/photos.js");
const Photos = mongoose.model("Photos");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const fs = require("fs");
const router = express.Router();
const sharp = require("sharp");


router.post("/addPhotos/:type", multer, async (req, res) => {
  // console.log("reqbody", req.body);
  console.log("FILE", req.file);
  const newName =
    Math.random().toString(36).substring(7) +
    "." +
    req.file.filename.split(".")[1];

  console.log(newName);
  await sharp(req.file.path)
    .resize(1000)
    .toFile(`photosBack/${req.body.categorie}/${newName}`);
  fs.unlinkSync(req.file.path);

  let photo = new Photos({
    alt: req.body.alt,
    src: newName,
    categorie: req.body.categorie,
    sous_categorie: req.body.sous_categorie,
  });
  console.log("photo", photo);
  photo.save((err) => {
    if (err) return handleErro(err);
    res.status(200).send("photo enregistré");
  });
});

router.get("/getPhotos/:categ/:sousCateg", (req, res) => {
  // console.log("param", req.params);
  if (req.params.sousCateg === "all") {
    Photos.find({ categorie: req.params.categ }, (err, data) => {
      // console.log(data);
      if (err) {
        res.send("erreur");
      } else {
        res.send(data);
      }
    });
  } else {
    Photos.find({ sous_categorie: req.params.sousCateg }, (err, data) => {
      // console.log(data);
      if (err) {
        res.send("erreur");
      } else {
        res.send(data);
      }
    });
  }
});

router.get("/getSousCategories/:type", (req, res) => {
  //console.log("param", req.params);
  Photos.find({ categorie: req.params.type }).distinct(
    "sous_categorie",
    function (error, ids) {
      // console.log(ids);
      res.send(ids);
    }
  );
});

router.get("/getOne/:id", (req, res) => {
  // console.log("param", req.params);
  Photos.findById(req.params.id, function (err, photo) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(photo);
    }
  });
});

router.post("/update", (req, res) => {
  console.log(req.body);
  Photos.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { alt: req.body.alt } },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Photo modifier");
      }
    }
  );
});

router.post("/delete", (req, res) => {
  Photos.findOne({ _id: req.body.id })
    .then((photo) => {
      const filename = photo.src;
      const folder = photo.categorie;
      fs.unlink(`photosBack/${folder}/${filename}`, () => {
        Photos.deleteOne({ _id: req.body.id })
          .then(() => res.status(200).send("Photo supprimé !"))
          .catch((error) => res.status(500).send(error));
      });
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
