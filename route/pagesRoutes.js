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
    name: "PROFESSIONNELS TARIFS",
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
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        //console.log(doc);
        res.send("Photo modifier");
      }
    }
  );
});

router.post("/updatePhotoCateg", auth, (req, res) => {
  // console.log("body", req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
    },
    {
      $set: {
        "blocs.$[i].imgCateg.$[j].src": req.body.newPhoto.src,
        "blocs.$[i].imgCateg.$[j].alt": req.body.newPhoto.alt,
        "blocs.$[i].imgCateg.$[j].categorie": req.body.newPhoto.categorie,
      },
    },
    {
      arrayFilters: [
        {
          "i._id": req.body.idBloc,
        },
        {
          "j._id": req.body.idOldPhoto,
        },
      ],
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("erreur lors de la modification");
      } else {
        //console.log(doc);
        res.send("Photo modifier");
      }
    }
  );
});

router.post("/updateCaroussel", auth, (req, res) => {
  //console.log(req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
      "blocs._id": req.body.idBloc,
    },
    {
      $set: {
        "blocs.$.imgCaroussel": req.body.caroussel,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Caroussel modifier");
      }
    }
  );
});

router.post("/updateTexte", auth, (req, res) => {
  //console.log(req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
      "blocs._id": req.body.idBloc,
    },
    {
      $set: {
        "blocs.$.paragraphes": req.body.texte,
      },
    },
    { new: true },
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Texte modifié");
      }
    }
  );
});

router.post("/updateMessage", auth, (req, res) => {
  //console.log(req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
      "blocs._id": req.body.idBloc,
    },
    {
      $set: {
        "blocs.$.message": req.body.texte,
      },
    },
    { new: true },
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Texte modifié");
      }
    }
  );
});

router.post("/updateSubtitle", auth, (req, res) => {
  //console.log(req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
      "blocs._id": req.body.idBloc,
    },
    {
      $set: {
        "blocs.$.subtitle": req.body.texte,
      },
    },
    { new: true },
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Texte modifié");
      }
    }
  );
});

router.post("/updateTitle", auth, (req, res) => {
  //console.log(req.body);
  Pages.findOneAndUpdate(
    {
      _id: req.body.idPage,
    },
    {
      $set: {
        name: req.body.texte,
      },
    },
    { new: true },
    (err) => {
      if (err) {
        res.status(500).send("erreur lors de la modification");
      } else {
        res.send("Texte modifié");
      }
    }
  );
});
module.exports = router;
