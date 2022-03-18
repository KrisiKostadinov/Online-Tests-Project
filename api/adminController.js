const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
    post: {
        async login(req, res) {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            
            if(!user) {
                return res.status(400).send({ message: 'Имейл или парола са невалидни.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword) {
                return res.status(400).send({ message: 'Имейл или парола са невалидни.' });
            }

            const token = jwt.sign({
                email,
                name: user.username,
                roles: user.roles,
                themeColor: user.themeColor,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.send({ message: 'Logged in', token });
        }
    }
}