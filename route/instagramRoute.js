const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const user_id = process.env.API_INSTAGRAM_USER_ID;
const access_token = process.env.API_INSTAGRAM_ACCESS_TOKEN;

router.router.get("/getLastInstagramPost", (req, res) => {
  axios
    .get(
      `https://api.instagram.com/v1/users/${user_id}/?access_token=${access_token}`
    )
    .then((resp) => {
      console.log(resp.data);
      //res.send(resp.data.items[0].id.videoId);
    });
});

module.exports = router;
