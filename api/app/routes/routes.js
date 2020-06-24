var express = require('express');

module.exports = () => {
    var app = express.Router();
    var pageController = require('../controllers/pageController')();

    // ERROR
    // app.get('/error', pageController.error);

    // HOME
    //app.get('/', pageController.index);

    // PROFILE
    // app.get('/profile', isLoggedIn, pageController.profile);

    // LOGOUT
    app.get('/logout', pageController.logout);

    // SIGNUP
    //app.get('/signup', pageController.signup);

    // AUTHENTICATION
    app.get('/auth/:method', pageController.authenticate);
    app.get('/auth/:method/callback', pageController.authenticateCallback)

    // UNLINK
    //app.get('/unlink/:method', isLoggedIn, pageController.unlink);

    return app;
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
