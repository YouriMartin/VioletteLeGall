const express = require("express");
const mongoose = require("mongoose");
require("../models/admin.js");
const Admin = mongoose.model("Admin");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/inscription", (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((passwordHased) => {
      if (req.body.pseudo != "" && req.body.password != "") {
        const admin = new Admin({
          pseudo: req.body.pseudo,
          password: passwordHased,
        });
        admin.save((err) => {
          if (err) return handleErro(err);
          res.status(200).send("admin inscrit");
        });
      } else {
        res.status(500).send("Il manque un element");
      }
    })
    .catch((error) => res.status(400).json({ error }));
});
router.post("/connexion", (req, res) => {
  console.log(req.body);
  Admin.findOne({ pseudo: req.body.pseudo })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ message: "Ce pseudo n'existe pas" });
      } else {
        console.log("toto");
        bcrypt.compare(req.body.password, admin.password).then((valid) => {
          if (!valid) {
            console.log("tata");
            return res.status(401).json({ message: "mot de passe incorrect" });
          }
          res.status(200).json({
            message: "connexion réussie",
            userId: admin._id,
            token: jwt.sign({ admin: admin._id }, "CleSecreteDencodage", {
              expiresIn: "3h",
            }),
          });
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
});

router.get("/isConnected", auth, (req, res) => {
  res.send(true);
});

router.post("/updatePassword", (req, res) => {
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((passwordHased) => {
      Admin.findOne({ pseudo: "admin" })
        .then((admin) => {
          console.log("toto");
          admin.password = passwordHased;
          admin.save((err) => {
            if (err) return handleErro(err);
            res.status(200).send("mot de passe changé");
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
});
module.exports = router;
