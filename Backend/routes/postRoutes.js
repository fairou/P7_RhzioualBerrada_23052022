//Impoortation Express
const express = require('express');
const path = require('path');

//Utilisation de la methode Router
const router = express.Router();

//Importation de auth pour la sécurité des routes
const auth = require('../middlewares/auth');
//Imporation de multer pour les images
const multer = require('../middlewares/multer-config-posts');

//Imporatation du controller des sauces
const postCtrl = require('../controllers/postController');

//Création des routes
// router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, multer, postCtrl.getPost);
router.post('/', auth, multer, postCtrl.createPost);

// router.put('/:id', auth, multer, postCtrl.modifyPost);
// router.delete('/:id', auth, postCtrl.deletePost);
// router.post("/:id/like", auth, postCtrl.likeDislikePost);

//Exportation du router
module.exports = router;