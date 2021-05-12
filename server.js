const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const articlesRoutes = require("./route/articlesRoutes");
const youtubeRoutes = require("./route/youtubeRoutes");
require("dotenv").config();

//middleware
const app = express();
const router = express.Router();
module.exports = router;
app.use("/static", express.static(__dirname + "/photosBack"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//MongoDB and Mongoose
let db = mongoose.connect("mongodb://localhost/TestVioletteSite");

//requêtes
app.use("/articles", articlesRoutes);
app.use("/youtube", youtubeRoutes);

app.listen(process.env.PORT);
console.log("le serveur écoute sur le port " + process.env.PORT);
