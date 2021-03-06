const jwt = require('jsonwebtoken');

//Module JWT pour la comunication JSON sécurisée.
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'le_Token_est_YGDYURYGHhuzhdk654s84s65z7shdi');
    const userId = decodedToken.userId;
    //Vérifie si l'utilisateur est correctement identifié.
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};