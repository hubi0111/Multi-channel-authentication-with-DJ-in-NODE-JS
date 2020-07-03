var LocalStrategy = require('passport-local').Strategy;
var OauthUser = require('../models/OauthUser');

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
                        return done(null, user);
                    }
                });
            });

        }));
}