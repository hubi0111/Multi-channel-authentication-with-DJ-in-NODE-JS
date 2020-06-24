module.exports = (passport) => {
    const auth = {};
    auth.authenticate = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, { scope: [method === 'google' ? 'profile' : 'public_profile', 'email'] })(req, res);
    }

    auth.authenticateCallback = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, {
            successRedirect: 'http://localhost:3000/profile', //currently connected to frontend
            failureRedirect: 'http://localhost:3000/error' //currently connected to frontend
        })(req, res)
    }

    auth.logout = (req, res) => {
        req.logout();
        res.redirect('http://localhost:3000/'); //currently connected to frontend
    }

    return auth;
}