require("dotenv").config();

const User = require('../models/UserModel');

// const schemaPassword = require("../models/passwordValidator");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ message: 'un compte utilisateur avec la même adresse mail existe déjà !' })
            } else {
                bcrypt
                    .hash(req.body.password, Number(process.env.Salt))
                    .then((hash) => {
                        let isAdmin = false;
                        if (req.body.email == 'admin@gmail.com') {
                            isAdmin = true;
                        }
                        const account = new User({
                            email: req.body.email,
                            password: hash,
                            isAdmin: isAdmin
                        });
                        account.save().then(() => {
                            console.log("account created successfully", account);
                            res.status(201).json({
                                message: 'Utilisateur créé !',
                                user: {
                                    userId: account._id,
                                    name: account.email.split('@')[0],
                                    isAdmin: account.isAdmin,
                                    token: jwt.sign({ userId: account._id, isAdmin: account.isAdmin },
                                        process.env.Token, { expiresIn: process.env.ExpireToken }
                                    )
                                }
                            });
                        }).catch(error => {
                            console.log("Erreur création du compte utilisateur !", error);
                            res.status(400).json({ message: 'Erreur création du compte utilisateur !', error: error });
                        });

                    }).catch((error) => res.status(500).json({ message: 'Erreur création account(bcrypt) ! !', error: error }));
            }
        })
};

//Fonction login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(account => {
            if (!account) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            } else if (!account.isActif) {
                return res.status(401).json({ message: "Le compte n'est pas actif !" });;
            }
            //Utilisation de bcrypt pour le hash du password
            bcrypt.compare(req.body.password, account.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }

                    res.status(200).json({
                        message: 'Utilisateur connecté !',
                        user: {
                            userId: account._id,
                            name: account.email.split('@')[0],
                            isAdmin: account.isAdmin,
                            token: jwt.sign({ userId: account._id, isAdmin: account.isAdmin },
                                process.env.Token, { expiresIn: process.env.ExpireToken }
                            )
                        }

                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error })
                });
        })
        .catch(error => {

            res.status(200).json({ error })
        });
};

//Fonction pour récupérer le profile de l'utilisateur
exports.getUserInfo = (req, res, next) => {

    User.findOne({ _id: req.params.id }).select("-password")
        .then((user) => {
            res.status(200).json({
                user: {
                    userId: user._id,
                    name: user.email.split('@')[0],
                    isAdmin: user.isAdmin
                }
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                error: error
            });
        });
};