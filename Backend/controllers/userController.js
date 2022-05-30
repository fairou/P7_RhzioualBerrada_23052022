const User = require('../models/UserModel');
const fs = require('fs');

//Fonction pour récupérer le profile de l'utilisateur
exports.getUserInfo = (req, res, next) => {

    User.findOne({ _id: req.params.id }).select("-password")
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


exports.editUserInfo = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            var userObjects;
            if (!user) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                if (req.file) {
                    if (user.profile.imageUrl) {
                        const filename = user.profile.imageUrl.split('/images/profiles/')[1];
                        console.log('filename', filename);
                        fs.unlink(`images/profiles/${filename}`, (err) => {
                            if (err) {
                                console.log('error deleting file', err);
                            }
                        });
                    }
                    userObjects = JSON.parse(req.body.user);
                    userObjects.profile.imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;

                } else {
                    userObjects = req.body;
                    userObjects.profile.imageUrl = user.profile.imageUrl;
                }

                User.updateOne({ _id: req.params.id }, {
                        $set: userObjects
                    }).then(() => {
                        res.status(200).json({ message: 'Profil modifié !' });
                    })
                    .catch(error => {
                        console.log('error !', error);
                        res.status(400).json({ message: 'Erreur lors de la modification du profile', error: error });
                    });

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });

};

//Fonction pour éditer le profile de l'utilisateur
exports.editUserInfo_old = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {

            if (!user) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                if (req.file) {
                    if (user.imageUrl) {
                        const filename = user.imageUrl.split('/images/profiles/')[1];
                        fs.unlink(`images/profiles/${filename}`, (err) => {
                            if (err) {
                                console.log('error deleting file', err);
                            }
                        });
                    }
                }

                const userObject = req.file ? {
                    ...JSON.parse(req.body.user)
                } : {...req.body };



                if (req.file) {
                    userObject.profile.imageUrl = `${req.protocol}://${req.get('host')}/images/profiles/${req.file.filename}`;

                } else {
                    userObject.profile.imageUrl = user.profile.imageUrl;
                }

                User.updateOne({ _id: req.params.id }, {
                        $set: userObject
                    }).then((user) => {
                        res.status(200).json({ message: 'Profil modifié !' });
                    })
                    .catch(error => {
                        console.log('error !', error);
                        res.status(400).json({ message: 'Erreur lors de la modification du profile', error: error });
                    });

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });

};