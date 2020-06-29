var LocalStrategy = require('passport-local').Strategy;
var OauthUser = require('../models/OauthUser');
var User = require('../models/User')

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
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            } else {
                                User.findOne({ 'email': email }, function (err, user1) {
                                    req.session.user = user1;
                                })
                                return done(null, newUser);
                            }
                        });
                    }
                });
            });
        }));

}