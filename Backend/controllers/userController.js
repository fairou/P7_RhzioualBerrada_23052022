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
                        const account = new User({
                            email: req.body.email,
                            password: hash,
                        });
                        account.save().then(() => {
                            console.log("account created successfully", account);
                            res.status(201).json({
                                message: 'Utilisateur créé !',
                                user: {
                                    id: account._id,
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