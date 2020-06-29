var FacebookStrategy = require('passport-facebook').Strategy;
var OauthUser = require('../models/OauthUser');
var User = require('../models/User')
var configAuth = require('./auth');

module.exports = (passport) => {
    var fbStrategy = configAuth.facebook;
    fbStrategy.passReqToCallback = true;
    passport.use(new FacebookStrategy(fbStrategy,
        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {

                OauthUser.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        if (!user.facebook.token) {
                            user.facebook.id = profile.id;
                            user.facebook.token = token;
                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                else {
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