const mongoose = require('mongoose');

require('dotenv').config()
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
})

const app = require('./app');


app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Servidor rodando na porta: ${server.address().port}`);
});