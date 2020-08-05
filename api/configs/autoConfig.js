var CustomStrategy = require('passport-custom').Strategy
var os = require('os')
var OauthUser = require('../models/OauthUser');

module.exports = (passport) => {
    passport.use(
        'auto',
        new CustomStrategy(function (req, done) {
            process.nextTick(function () {
                const uname = os.userInfo().username;
                OauthUser.find({ auto: true }, function (err, user) {
                    user.forEach(obj => {
                        if (obj.username === uname) {
                            return done(null, obj);
                        }
                        return done(null, false, { errors: { user: 'is invalid' } });
                    });
                });
            });
        }),
    );
};
