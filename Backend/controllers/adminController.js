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

//Fonction pour éditer le profile de l'utilisateur
exports.editUserAccess = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "Utiliser not found" });
            } else {
                // todo: modifier le statut du compte utilisateur IsActif

                //User.updateOne({})
                console.log(req.body);

                return res.status(200).json({ error: "Utilisateur modifié" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });

};