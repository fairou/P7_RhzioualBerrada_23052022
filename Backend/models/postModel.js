//Importation de mongoose
const mongoose = require('mongoose');

//Creation du model pour les utilisateurs


const CommentSchema = mongoose.Schema({
    comment: { type: String, },
    timestamp: { type: Date, default: new Date(), },
});

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
    comments: [CommentSchema]
});

const postsSchemaModel = mongoose.model('posts', PostSchema);
const commentsSchemaModel = mongoose.model('comments', CommentSchema);
module.exports = {
    postModel: postsSchemaModel,
    commentModel: commentsSchemaModel
}

//Exportation du model
// module.exports = mongoose.model('posts', PostSchema);
// module.exports = mongoose.model('comments', CommentSchema);