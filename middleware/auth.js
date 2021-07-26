const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecreteKey = process.env.JWT_SECRETE_KEY;

module.exports = (req, res, next) => {
  //console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, jwtSecreteKey);
    next();
  } catch (error) {
    if (error) {
      res.send(error);
    } else {
      res.status(401).json({ error: "requête non authentifiée" });
    }
  }
};
