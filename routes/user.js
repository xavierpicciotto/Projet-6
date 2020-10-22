const express = require('express');
const router = express.Router();

//Importation du fichier des controllers.
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

 module.exports = router;   