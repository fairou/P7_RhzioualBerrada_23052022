//Impoortation mongoose
const mongoose = require('mongoose');
//Impoortation Express
const express = require('express');
// Prise en charge du CORS 
const cors = require("corss");
//Protection des en-tetes headers
const helmet = require("helmet");

const path = require('path');

// Prise en charge du fichier de configuration .env
require("dotenv").config();

//Imporation des différentes routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const adminRoutes = require('./routes/adminRoutes');



//Connexion à la bdd
mongoose.connect(process.env.DatabaseConnexion, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Utilisation d'express
const app = express();

app.use(express.static(path.join(__dirname, "images")));

//Protection des en-tetes headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//CORS
app.use(cors({
    origin: 'http://localhost:4200',
    setHeader: [(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ), (
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )]
}));

// pour analyser le corps de la requête. prise en charge de json envoyé par le front dans le body
app.use(express.json());
//Middleware pour l'authentification
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/admin', adminRoutes);

//Middleware pour le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;