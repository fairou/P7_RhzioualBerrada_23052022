//Impoortation Express
const express = require('express');
//Utilisation de la methode Router
const router = express.Router();

//Importation de auth pour la sécurité des routes
const auth = require('../middlewares/auth');

//Imporatation du controller des utilisateurs
const adminCtrl = require('../controllers/adminController');
// const userCtrl = require('../controllers/userController');
// const postCtrl = require('../controllers/postController');

//Création des routes
router.put('/users/:id', auth, adminCtrl.editUserAccess);
router.put('/users/:id', auth, adminCtrl.getAllUsers);


//Exportation du router
module.exports = router;