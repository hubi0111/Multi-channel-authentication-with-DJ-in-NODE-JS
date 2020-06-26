module.exports = (passport) => {
    const auth = {};
    auth.authenticate = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, { scope: 'email'})(req, res);
    }

    auth.authenticateCallback = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, {
            successRedirect: 'http://localhost:3005/profile', //currently connected to frontend
            failureRedirect: 'http://localhost:3005/error' //currently connected to frontend
        })(req, res)
    }

    auth.logout = (req, res) => {
        req.logout();
        res.redirect('http://localhost:3005/'); //currently connected to frontend
    }

    return auth;
}