const jwt = require('jsonwebtoken');

const loggedOut = (req, res, next) => {
    const token = req.cookies.userToken;

    if(token) {
        return res.redirect('/');
    }

    next();
}

const loggedIn = (req, res, next) => {
    const token = req.cookies.userToken;

    if(!token) {
        return res.redirect('/users/login');
    }

    next();
}

module.exports = {
    loggedOut,
    loggedIn,
}