const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const PhotosSchema = new Schema({
  alt: String,
  src: String,
  categorie: String,
  sous_categorie: String,
});
mongoose.model('Photos', PhotosSchema);
