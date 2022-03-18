const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token == '') {
        return res.status(403).send({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Unauthorized' });
        }

        res.send(decoded);
    });
}

module.exports = {
    isAuth
}