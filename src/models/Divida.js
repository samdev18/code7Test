const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.Promise = global.Promise;
const objectId = mongoose.Schema.Types.ObjectId;

const modelSchema = new mongoose.Schema({
    seq: { type: Number, default: 0 },
    devedor: {
        type: objectId,
        ref: 'user'
    },
    idUser: String,
    motivo: String,
    data: Date,
    valor: String
});

modelSchema.plugin(AutoIncrement, { inc_field: 'seq' })
const modelName = 'divida';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}