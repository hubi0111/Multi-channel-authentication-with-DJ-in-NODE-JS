var LocalStrategy = require('passport-local').Strategy;
var OauthUser = require('../models/OauthUser');
var User = require('../models/User')

module.exports = (passport) => {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase();
            process.nextTick(function () {
                OauthUser.findOne({ 'email': email }, function (err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password)) {
                        return done(null, false);
                    } else {
                        User.findOne({ 'email': email }, function (err, user1) {
                            req.session.user = user1;
                        })
                        return done(null, user);
                    }
                });
            });

        }));
}