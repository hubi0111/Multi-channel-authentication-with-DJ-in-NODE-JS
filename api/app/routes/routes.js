module.exports = (app, passport) => {
    var pageController = require('../controllers/pageController')(passport);

    // LOGOUT
    app.get('/logout', pageController.logout);

    // AUTHENTICATION
    app.get('/auth/:method', pageController.authenticate);
    app.get('/auth/:method/callback', pageController.authenticateCallback)

    return app;
};