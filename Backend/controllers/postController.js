const Post = require('../models/postModel');
const fs = require('fs');

//Fonction ajout d'un Post
exports.createPost = (req, res, next) => {

    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post.postModel({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'post successfully added !', post: post }))
        .catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            }

        );
};

exports.getPost = (req, res, next) => {
    Post.postModel.findOne({ _id: req.params.id })
        .then((post) => {

            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({
                error: error
            });
        });
}