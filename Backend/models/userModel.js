//Importation de mongoose
const mongoose = require('mongoose');

//Creation du model pour les utilisateurs

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {

        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        pseudo: { type: String, required: false },
        imageUrl: { type: String, required: false },
        isAdmin: { type: Boolean, default: false },
        isActif: { type: Boolean, default: true },

    },
    timestamp: { type: Date, default: new Date(), }
});



//Exportation du model
module.exports = mongoose.model('users', UserSchema);