var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('express-jwt'),
    User = mongoose.model('User');


router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all of the required fields'
        });
    }

    var user = new User();

    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save((err) => {
        if (err) { return res.status(400).json(err); }
        return res.json({ token: user.generateJWT()});
    });
});

router.post('/login', (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({
			message: 'Please fill out all fields'
		});
	}

	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }

		if (user) {
			return res.json({
				token: user.generateJWT()
			});
		} else {
			return res.status(401).json(info);
		}
	})(req, res);
});

module.exports = router;