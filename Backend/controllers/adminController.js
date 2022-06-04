const Post = require('../models/postModel');

//Fonction pour éditer l'acces du profile de l'utilisateur
exports.modifyposts = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(403).json({ error: "Utiliser not found" });
            } else {
                if (req.file) {
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) {
                            console.log('error deleting file', err);
                        }
                    });
                }

                const postsObject = req.file ? {
                    ...JSON.parse(req.body.post),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {...req.body };

                posts.updateOne({ _id: req.params.id }, {...postsObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(400).json({ error }));

            }
        })
        .catch(error => res.status(500).json({ error }));

};

exports.deleteposts = (req, res, next) => {
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