const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const PagesSchema = new Schema({
  name: String,
  blocs: [
    {
      img: {
        src: String,
        alt: String,
        categorie: String,
      },
      imgCaroussel: [
        {
          src: String,
          alt: String,
          categorie: String,
          order: Number,
        },
      ],
      subtitle: String,
      paragraphes: String,
      message: String,
      imgCateg: [
        {
          src: String,
          alt: String,
          name: String,
          categorie: String,
          route: String,
        },
      ],
    },
  ],
});
mongoose.model("Pages", PagesSchema);
