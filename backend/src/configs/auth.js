module.exports = {

    'facebook': {
        'clientID': '708382343245956',
        'clientSecret': 'c8ed259aba5265cbe8a8d7efa854c355',
        'callbackURL': 'http://localhost:9005/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name']
    },

    'google': {
        'clientID': '175590422828-656012q3057pg3ir4kan5jqcbraf94h3.apps.googleusercontent.com',
        'clientSecret': '177f0Qpt0L3Vd-2a-u_qjFA_',
        'callbackURL': 'http://localhost:9005/auth/google/callback'
    }

};
