const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const youtubeKey = process.env.API_YOUTUBE_KEY;
const youtubeChannelId = process.env.API_YOUTUBE_CHANNEL_ID;

router.get("/getLastvideo", (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=1`
    )
    .then((resp) => {
      // console.log(resp.data.items[0].id.videoId);
      res.send(resp.data.items[0].id.videoId);
    });
});

router.get("/getLast2videos", (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=2`
    )
    .then((resp) => {
      console.log("toto");
      const videos = [
        {
          lien: resp.data.items[0].id.videoId,
          titre: resp.data.items[0].snippet.title,
        },
        {
          lien: resp.data.items[1].id.videoId,
          titre: resp.data.items[1].snippet.title,
        },
      ];
      console.log(videos);
      res.send(videos);
    });
});

module.exports = router;
