const express = require("express");
const mongoose = require("mongoose");
require("../models/pages.js");
const Pages = mongoose.model("Pages");
const auth = require("../middleware/auth");
const fs = require("fs");
const router = express.Router();

router.post("/addPage", (req, res) => {
  console.log(req.body);
  let page = new Pages({
    name: "PARTICULIERS PORTFOLIO",
    blocs: req.body,
  });
  console.log("page", page);
  page.save((err) => {
    if (err) return handleErro(err);
    res.status(200).send("page enregistré");
  });
});

router.get("/getPage/:id", (req, res) => {
  // console.log("param", req.params);
  Pages.findById(req.params.id, function (err, page) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(page);
    }
  });
});

router.post("/updatePhoto", auth, (req, res) => {
  // console.log("body", req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
      "blocs._id": req.body.idBloc,
    },
    {
      $set: {
        "blocs.$.img": {
          src: req.body.newPhoto.src,
          alt: req.body.newPhoto.alt,
          categorie: req.body.newPhoto.categorie,
        },
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        //console.log(doc);
        res.send("Photo modifier");
      }
    }
  );
});
module.exports = router;
