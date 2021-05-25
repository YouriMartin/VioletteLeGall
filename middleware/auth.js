const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1]; // ATTENTION: quand on veut récupérer une donnée du header de la requête, il faut mettre le nom de l'attribut du header tout en minuscule
    const decodeToken = jwt.verify(token, "CleSecreteDencodage"); // Décodage du middleware

    const userIdDecode = decodeToken.userId; // on extrait le userId du token décodé
    if (req.headers.userid != userIdDecode) {
      //si la comparaison n'est pas bonne, on intérompt l'exécution du middlware et on déclenche un message d'erreur
      throw "Id User non valable !"; // throw permet de passer directement au catch et donne ici un String pour l'argument du catch (error)
    } else {
      next(); // si la comparaison est bonne, on permet à l'application d'exécuter le prochain middleware.
    }
  } catch (error) {
    if (error) {
      res.status(401).json({ error }); // Il peut arrivé que quelque chose ne fonctionne pas sans qu'il y ait de message d'erreur, donc soit on donne le message d'erreur
    } else {
      // soit on envoit un message d'erreur générique: requête non authentifiée
      res.status(401).json({ error: "requête non authentifiée" });
    }
  }
};
