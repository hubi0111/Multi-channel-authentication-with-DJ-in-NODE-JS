var passport = require('passport')
require('../../config/passport')(passport)

module.exports = () => {
    const auth = {};
    auth.authenticate = (req, res) => {
        var method = req.params.method
        if (method === 'google') {
            passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
        } else if (method === 'facebook') {
            passport.authenticate('facebook', { scope: ['public_profile', 'email'] })(req, res);
        }
    }

    auth.authenticateCallback = (req, res) => {
        var method = req.params.method
        console.log(method)
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



// exports.error = (req, res) => {
//     res.status(400);
//     res.render('401.jade', { title: '401: Could not Authenticate' });
// }

// exports.index = (req, res) => {
//     res.render('index.ejs', { message: req.flash('loginMessage') });
// }

// exports.profile = (req, res) => {
//     res.render('profile.ejs', {
//         user: req.user
//     });
// }

// exports.logout = (req, res) => {
//     req.logout();
//     res.redirect('/');
// }

// exports.signup = (req, res) => {
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
// }

// exports.unlink = (req, res) => {
//     var method = req.params.method;
//     var user = req.user;
//     if (method === 'local') {
//         user.email = undefined;
//         user.password = undefined;
//         user.facebook = undefined;
//         user.google = undefined;
//     } else if (method === 'google') {
//         user.google = undefined;
//     } else if (method === 'facebook') {
//         user.facebook = undefined;
//     }
//     user.save(function (err) {
//         res.redirect('/profile');
//     });
// }

// exports.authenticate = (req, res) => {
//     var method = req.params.method
//     console.log(method)
//     if (method === 'local') {
//         res.render('login.ejs', { message: req.flash('loginMessage') });
//     } else if (method === 'google') {
//         passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
//     } else if (method === 'facebook') {
//         passport.authenticate('facebook', { scope: ['public_profile', 'email'] })(req, res);
//     }
// }

// exports.authenticateCallback = (req, res) => {    
//     var method = req.params.method
//     passport.authenticate(method, {
//         successRedirect: 'http://localhost:9000/profile', //currently connected to backend
//         failureRedirect: 'http://localhost:9000/error' //currently connected to backend
//     })(req, res)
// }
