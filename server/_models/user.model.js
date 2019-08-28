var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken');

var schema = new mongoose.Schema({
    hash: String,
    salt: String,
    username: { type: String, lowercase: true, unique: true }
});

// Define setPassword method for Customer
schema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(64).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

// Define validPassword method for Customer
schema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

    return this.hash === hash;
};

schema.methods.generateJWT = function () {
    // Set exp to 1 day
    var today = new Date(),
        exp = new Date(today);
    exp.setDate(today.getDate() + 1);

    // Return signed jwt
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.BTENDER_JWT_SECRET);
};

mongoose.model('User', schema);