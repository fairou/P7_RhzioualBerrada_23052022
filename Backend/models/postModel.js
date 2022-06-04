//Importation de mongoose
const mongoose = require('mongoose');
const CommentSchema = require('./commentModel');

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    post: { type: String, required: true },
    imageUrl: { type: String, required: false },
    userId: { type: String, required: true },
    likes: { type: Number, default: 0, },
    dislikes: { type: Number, default: 0, },
    usersLiked: { type: [String], },
    usersDisliked: { type: [String], },
    timestamp: { type: Date, default: new Date(), },
    comments: {
        type: [CommentSchema],
        default: undefined
    },
});


module.exports = mongoose.model('posts', PostSchema);