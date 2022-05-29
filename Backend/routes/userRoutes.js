//Impoortation Express
const express = require('express');
//Utilisation de la methode Router
const router = express.Router();

//Importation de auth pour la sécurité des routes
const auth = require('../middlewares/auth');
//Imporation de multer pour les images
const multer = require('../middlewares/multer-config-profiles');


//Imporatation du controller des utilisateurs
const usrCtrl = require('../controllers/userController');

//Création des routes
router.get('/:id', auth, usrCtrl.getUserInfo);
router.put('/:id', auth, multer, usrCtrl.editUserInfo);


//Exportation du router
module.exports = router;