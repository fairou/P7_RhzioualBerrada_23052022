const User = require('../models/UserModel');

//Fonction récupérer tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    User.find().then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//Fonction pour éditer l'acces du profile de l'utilisateur
exports.editUserAccess = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "Utiliser not found" });
            } else {
                // todo: modifier le statut du compte utilisateur IsActif

                User.updateOne({ _id: req.params.id }, {
                    $set: {
                        "profile.isActif": req.body.isActif,
                        "profile.isAdmin": req.body.isAdmin,
                    }
                }).then(() => {
                    return res.status(200).json({ message: "Utilisateur modifié" });
                }).catch(error => {
                    console.log("erreur modification compte utilisateur", error);
                    res.status(500).json({ error: error });
                });


            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });

};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(403).json({ message: "utilisateur non trouvé" });
            } else {
                if (user.profile.imageUrl) {
                    const filename = user.profile.imageUrl.split('/images/profiles')[1];
                    fs.unlink(`images/profiles/${filename}`, (err) => {
                        if (err) {
                            console.log('error deleting file', err);
                        }
                    });
                }
                user.deleteOne({ _id: req.params.id })
                    .then(() => {
                        return res.status(204).json({ message: 'utilisateur supprimé !' });
                    })
                    .catch(error => {
                        console.log('error deleting user', error);
                        res.status(400).json({ error: error });
                    });
            }
        })
        .catch(error => {
            console.log('error searching for user', error);
            res.status(500).json({ error: error });
        });
};