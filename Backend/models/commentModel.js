//Importation de mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: new Date(), },
});