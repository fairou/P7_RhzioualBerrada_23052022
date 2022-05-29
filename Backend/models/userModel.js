//Importation de mongoose
const mongoose = require('mongoose');

//Creation du model pour les utilisateurs

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    account: {
        isActif: { type: Boolean, default: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        alias: { type: String, required: true },
        imageUrl: { type: Boolean, required: false },
        roles: { type: [String], }
    }

});
const newUserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account: {
        isActif: { type: Boolean, default: true },
        firstname: { type: String, required: false },
        lastname: { type: String, required: false },
        alias: { type: String, required: false },
        //imageUrl: { type: Boolean, required: false },
        roles: { type: [String], },
        //isAdmin: { type: Boolean, default: false }
    }

});



//Exportation du model
//const userSchemaModel = mongoose.model('users1', userSchema);
const newUserSchemaModel = mongoose.model('users', newUserSchema);
module.exports = {
    //userModel: userSchemaModel,
    newUserModel: newUserSchemaModel
}