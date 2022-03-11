const jwt = require('jsonwebtoken');

const loggedOut = (req, res, next) => {
    const token = req.cookies.userToken;

    if (token) {
        return res.redirect('/');
    }

    next();
}

const loggedIn = (req, res, next) => {
    const token = req.cookies.userToken;

    if (!token) {
        return res.redirect('/users/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.redirect('/users/login');
        }

        res.locals.user = decoded;
    });

    next();
}

module.exports = {
    loggedOut,
    loggedIn,
}