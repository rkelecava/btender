const express = require('express'),
    app = express(),
    port = process.env.port || 3000,
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./_config'),
    models = require('./_models'),
    routes = require('./_routes');

if (!process.env.BTENDER_JWT_SECRET) {
    var env = require('./_config/env');
}

models.load();

require('./_config/passport');

var mongoose = require('mongoose');
var passport = require('passport');

// Mongoose database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db, config.dbOptions, function (err) {
    if (err) { 
        console.log(err);
        process.exit();
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

routes.load(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happend', err);
    }
    console.log(`server is listening on ${port}`);
});