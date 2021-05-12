const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storageImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "photosBack");
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Le fichier doit etre un JPG"));
    }
    cb(undefined, true);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Math.random().toString(36).substring(7) +
        "." +
        file.originalname.split(".")[1]
    );
  },
});

module.exports = multer({ storage: storageImage }).single("src");
