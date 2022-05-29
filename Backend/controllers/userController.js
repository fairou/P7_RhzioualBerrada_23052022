require("dotenv").config();

const User = require('../models/UserModel');
const fs = require('fs');

//Fonction pour récupérer le profile de l'utilisateur
exports.getUserInfo = (req, res, next) => {

    User.newUserModel.findOne({ _id: req.params.id }).select("-password")
        .then((user) => {

            res.status(200).json(user);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                error: error
            });
        });
};

//Fonction pour éditer le profile de l'utilisateur
exports.editUserInfo = (req, res, next) => {
    User.newUserModel.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                if (req.file) {
                    const filename = user.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) {
                            console.log('error deleting file', err);
                        }
                    });
                }

                const userObject = req.file ? {
                    ...JSON.parse(req.body.user),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {...req.body };

                User.newUserModel.updateOne({ _id: req.params.id }, {...userObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Profil modifié !' }))
                    .catch(error => res.status(400).json({ message: 'Erreur lors de la modification du profile', error: error }));

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });

};