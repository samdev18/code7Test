const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idApi: String,
    name: String,
    username: String,
    email: String,
    address: Object,
    phone: String,
    website: String,
    company: Object
});
const modelName = 'user';

modelSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}