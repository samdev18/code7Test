const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');

const router = require('./src/routes');
const errorHandler = require('./src/handlers/errorHandler');
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashes = req.flash();
    next();
})
app.use('/', router);
app.use(errorHandler.notFound);
app.engine('mst', mustache(__dirname + '/src/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/src/views');

module.exports = app;