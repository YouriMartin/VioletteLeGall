const express = require("express");
const nodemailer = require("nodemailer");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_USER,
    pass: process.env.CONTACT_PASSWORD,
  },
});

router.post("/sendMail", (req, res) => {
  console.log(req.body);
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETE_KEY}&response=${req.body.token}`
    )
    .then((resp) => {
      console.log(resp.data);
      if (resp.data.success === true) {
        transporter.sendMail({
          from: process.env.CONTACT_USER,
          to: process.env.CONTACT_EMAIL_TO,
          cc: process.env.CONTACT_USER,
          subject: "Demande de photos d'un " + req.body.type,
          text: req.body.message + " email : " + req.body.email,
        });
        res.send("Message envoyé");
      } else {
        res.send("Bip Bip tu es un robot !!");
      }
    });
});
module.exports = router;
