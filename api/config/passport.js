// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var OauthUser = require('../app/models/OauthUser');
var User = require('../app/models/User')

var configAuth = require('./auth');
const e = require('express');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        OauthUser.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //  LOGIN
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
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    } else {
                        User.findOne({ 'email': email }, function (err, user1) {
                            req.session.user = user1;
                        }).then(() => {
                            console.log(req.session.user.email);
                            console.log(req.session.user.phoneNumber);
                        })
                        return done(null, user);
                    }
                });
            });

        }));

    //  SIGNUP
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
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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
                                }).then(() => {
                                    console.log(req.session.user.email);
                                    console.log(req.session.user.phoneNumber);
                                })
                                return done(null, newUser);
                            }
                        });
                    }
                });
            });
        }));

    // FACEBOOK 
    var fbStrategy = configAuth.facebookAuth;
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
                            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                }
                                else {
                                    User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                        req.session.user = user1;
                                        req.session.token = token;
                                    }).then(() => {
                                        console.log(req.session.user.email);
                                        console.log(req.session.token);
                                    })
                                    return done(null, user);
                                }
                            });
                        } else {
                            User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                req.session.user = user1;
                                req.session.token = token;
                            }).then(() => {
                                console.log(req.session.user.email);
                                console.log(req.session.token);
                            })
                            return done(null, user);
                        }
                    } else {
                        done(null);
                    }
                });
            });
        }));

    // GOOGLE 
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
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
                            user.google.name = profile.displayName;

                            user.save(function (err) {
                                if (err) {
                                    return done(err);
                                } else {
                                    User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                        req.session.user = user1;
                                        req.session.token = token;
                                    }).then(() => {
                                        console.log(req.session.user.email);
                                        console.log(req.session.token);
                                    })
                                    return done(null, user);
                                }
                            });
                        } else {
                            User.findOne({ 'email': profile.emails[0].value.toLowerCase() }, function (err, user1) {
                                req.session.user = user1;
                                req.session.token = token;
                            }).then(() => {
                                console.log(req.session.user.email);
                                console.log(req.session.token);
                            })
                            return done(null, user);
                        }
                    } else {
                        done(null);
                    }
                });
            });
        }));
};
