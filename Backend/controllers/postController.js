const Post = require("../models/postModel");
const fs = require("fs");

//Fonction ajout d'un Post
exports.createPost = (req, res, next) => {
    var postObject;

    if (req.file) {
        postObject = JSON.parse(req.body.post);
        postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
      req.file.filename
    }`;
    } else {
        postObject = req.body;
    }
    delete postObject._id;

    const post = new Post({
        ...postObject,
    });

    post
        .save()
        .then(() =>
            res.status(201).json({ message: "post successfully added !", post: post })
        )
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: error });
        });
};

exports.getPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                error: error,
            });
        });
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .sort({ timestamp: -1 })
        .all()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId !== req.auth.userId && !req.auth.isadmin) {
                return res.status(403).json({ error: "Accès non autorisé" });
            } else {
                if (req.file && req.imageUrl != undefined && req.imageUrl != "") {
                    const filename = post.imageUrl.split("/images/posts")[1];
                    fs.existsSync(`images/posts/${filename}`).then(() => {
                        fs.unlink(`images/posts/${filename}`, (err) => {
                            if (err) {
                                console.log("error deleting file", err);
                            }
                        });
                    });
                }
                console.log('req:', req.body.post);
                const postObject = req.file ? {
                    ...JSON.parse(req.body.post),
                    imageUrl: `${req.protocol}://${req.get("host")}/images/posts/${
                req.file.filename
              }`,
                } : {...req.body };
                console.log('postObject:', postObject);

                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "post modifié !" }))
                    .catch((error) => {
                        console.log("error update post - DB:", error);
                        res.status(400).json({ error: error });
                    });
            }
        })
        .catch((error) => {
            console.log("error update post:", error);
            res.status(500).json({ error: error });
        });
};
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post) {
                if (post.userId !== req.auth.userId && !req.auth.isadmin) {
                    return res.status(403).json({ error: "Accès non autorisé" });
                } else {
                    if (
                        post.imageUrl &&
                        post.imageUrl != undefined &&
                        post.imageUrl != ""
                    ) {
                        const filename = post.imageUrl.split("/images/posts")[1];
                        fs.unlink(`images/posts/${filename}`, (err) => {
                            if (err) {
                                console.log("error deleting file", err);
                            }
                            Post.deleteOne({ _id: req.params.id })
                                .then(() => {
                                    return res.status(204).json({ message: "Objet supprimé !" });
                                })
                                .catch((error) => {
                                    console.log("error deleting post", error);
                                    res.status(400).json({ error: error });
                                });
                        });
                    } else {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => {
                                return res.status(204).json({ message: "Objet supprimé !" });
                            })
                            .catch((error) => {
                                console.log("error deleting post", error);
                                res.status(400).json({ error: error });
                            });
                    }
                }
            } else {
                res.status(404).json({ message: "Acun post trouvé" });
            }
        })
        .catch((error) => {
            console.log("error findOne post", error);
            res.status(500).json({ error: error });
        });
};
//Fonction Like ou Dislike  d'un post
exports.likeDislikePost = (req, res, next) => {
    //Récupération de l'id du post
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            switch (req.body.like) {
                case 1:
                    //Si l'id user n'est pas présent dans le tableau des like alors on incrémente +1
                    if (!post.usersLiked.find((user) => user === req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                                $inc: { likes: 1 },
                                $push: { usersLiked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "Like ajouté !" }))
                            .catch((error) => res.status(500).json(error));
                    } else {
                        //Si l'utilisateur a déjà liker le contenu alors il ne peut pas reliker
                        res.status(401).json({
                            error: "Like déjà pris en compte",
                        });
                    }
                    break;
                case -1:
                    //Si l'id user n'est pas présent dans le tableau des dislike alors on incrémente -1
                    if (!post.usersDisliked.find((user) => user === req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: 1 },
                                $push: { usersDisliked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "disLike retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    } else {
                        //Si l'utilisateur a déjà disliker le contenu alors il ne peut pas redisliker
                        res.status(401).json({
                            error: "disLike déjà pris en compte",
                        });
                    }
                    break;

                case 0:
                    //Si l'id user n'est pas présent dans le tableau des like alors on incrémente -1
                    if (post.usersLiked.find((user) => user === req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "Like retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    }
                    //Si l'id user n'est pas présent dans le tableau des dislike alors on incrémente -1

                    if (post.usersDisliked.find((user) => user === req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                            })
                            .then(() => res.status(200).json({ message: "disLike retiré !" }))
                            .catch((error) => res.status(500).json(error));
                    }
                    break;
            }
        })
        .catch((error) => res.status(404).json(error));
};