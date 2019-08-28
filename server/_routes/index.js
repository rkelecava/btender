function load(app) {
    app.use('/api/user', require('./user.routes'));
}

module.exports = { load };