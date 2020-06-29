var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var OauthUser = require('../models/OauthUser');
var User = require('../models/User')
var configAuth = require('./auth');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: configAuth.google.clientID,
        clientSecret: configAuth.google.clientSecret,
        callbackURL: configAuth.google.callbackURL,
        passReqToCallback: true
    },
        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                OauthUser.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        if (!user.google.token) {
                            user.google.id = profile.id;
                            user.google.token = token;
                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                } else {
                                    User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                        req.session.user = user1;
                                        req.session.token = token;
                                    })
                                    return done(null, user);
                                }
                            });
                        } else {
                            User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                req.session.user = user1;
                                req.session.token = token;
                            })
                            return done(null, user);
                        }
                    } else {
                        done(null);
                    }
                });
            });
        }));
}