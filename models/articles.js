const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const ArticlesSchema = new Schema({
  titre: String,
  img: { src: String, alt: String },
  texte: String,
  date: Date,
});
mongoose.model("Articles", ArticlesSchema);
