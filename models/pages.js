const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const PagesSchema = new Schema({
  name: String,
  blocs: [
    {
      img: { src: String, alt: String },
      imgCaroussel: [{ src: String, alt: String, order: Number }],
      subtitle: String,
      paragraphes: [String],
      message: String,
    },
  ],
});
mongoose.model("Pages", PagesSchema);
