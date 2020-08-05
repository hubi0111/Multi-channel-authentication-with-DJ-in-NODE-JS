var LocalStrategy = require('passport-local').Strategy;
var OauthUser = require('../models/OauthUser');

module.exports = (passport) => {
    passport.use('signup', new LocalStrategy({
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
                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new OauthUser();
                        newUser.email = email;
                        newUser.username = req.query.username
                        newUser.password = newUser.generateHash(password);
                        newUser.auto = req.query.auto
                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            } else {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            });
        }));

}