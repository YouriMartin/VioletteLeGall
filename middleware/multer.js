const multer = require("multer");

const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    let type = req.params.type;
    callback(null, `photosBack/${type}`);
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Le fichier doit etre un JPG"));
    }
    cb(undefined, true);
  },
  filename: function (req, file, cb) {
    /* cb(
      null,
      Math.random().toString(36).substring(7) +
        "." +
        file.originalname.split(".")[1]
    );*/
    cb(null, file.originalname);
  },
});

module.exports = multer({ storage: storageImage }).single("src");
