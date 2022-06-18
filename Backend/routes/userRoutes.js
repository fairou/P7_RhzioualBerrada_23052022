//Impoortation Express
const express = require('express');
const rateLimit = require('express-rate-limit');

//Utilisation de la methode Router
const router = express.Router();
//Importation de auth pour la sécurité des routes
const auth = require('../middlewares/auth');
//Imporation de multer pour les images
const multer = require('../middlewares/multer-config-profiles');

//Imporatation du controller des utilisateurs
const userCtrl = require('../controllers/userController');

const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: "Too many request from this IP. please try again in 15 min",
        skipSuccessfulRequests: true, // count successful requests (status < 400)

    })
    //Création des routes
    // Apply the rate limiting middleware to login requests

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.get('/:id', auth, userCtrl.getUserInfo);
router.put('/:id', auth, multer, userCtrl.editUserInfo);
//Exportation du router
module.exports = router;