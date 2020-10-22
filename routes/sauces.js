const express = require('express');
const router = express.Router();

//Importation des Middlewares et des fonctions de controle.
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, saucesCtrl.findAllSauces);
router.post('/', auth , multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.updateSauce);
router.get('/:id', auth, saucesCtrl.findOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.ratingSauce);

module.exports = router;