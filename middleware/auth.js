const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "CleSecreteDencodage");

    const userIdDecode = decodeToken.userId;
    if (req.headers.userid != userIdDecode) {
      throw "Id User non valable !";
    } else {
      next();
    }
  } catch (error) {
    if (error) {
      res.send(error);
    } else {
      res.status(401).json({ error: "requête non authentifiée" });
    }
  }
};
