const User = require('../models/user');

module.exports.create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelpiversity!');
            res.redirect('/universities')
        });
    }
    //Catch registration-related errors (i.e. username already taken) and flash them to the registration screen 
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.login = (req, res) => {
    const username = req.body.username;
    req.flash('success', `Welcome back, ${username}!`);
    var redirectUrl = res.locals.returnTo || '/universities';
    if (redirectUrl.includes('/reviews')) redirectUrl = '/universities'
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/universities');
    });
}