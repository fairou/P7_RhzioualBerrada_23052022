//Impoortation Express
const express = require('express');
//Utilisation de la methode Router
const router = express.Router();

//Importation de auth pour la sécurité des routes
const auth = require('../middlewares/auth');

//Imporatation du controller des utilisateurs
const adminCtrl = require('../controllers/adminController');

//Création des routes
router.put('/users/:id', auth, adminCtrl.modifyposts);
router.delete('/users/:id', auth, adminCtrl.deleteposts);

// router.get('/posts/:id', auth, adminCtrl.getOnePost);


//Exportation du router
module.exports = router;