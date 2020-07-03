module.exports = (passport) => {
    const auth = {};
    auth.authenticate = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, { scope: 'email'})(req, res);
    }

    auth.authenticateCallback = (req, res) => {
        var method = req.params.method
        passport.authenticate(method, {
            successRedirect: 'http://localhost:3003/auth/home', //redirect to home page
            failureRedirect: 'http://localhost:3003/auth/error' //redirect to error page
        })(req, res)
    }

    auth.logout = (req, res) => {
        req.logout();
        res.redirect('http://localhost:3003/'); //redirect to login page
    }

    return auth;
}