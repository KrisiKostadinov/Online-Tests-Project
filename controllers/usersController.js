const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    get: {
        login(req, res) {
            res.render('users/login', { page: 'Вход', themeColor: 'bg-light' });
        },
        register(req, res) {
            res.render('users/register', { page: 'Регистрация', themeColor: 'bg-light' });
        }
    },
    post: {
        login(req, res) {

        },

        async register(req, res) {
            const { username, email, password, confirmPassword } = req.body;

            const obj = {
                page: '',
                themeColor: 'bg-light',
                username,
                email,
                password,
                confirmPassword,
            }

            if (username == '' || email == '' || password == '') {
                return res.render('users/register', { ...obj, error: 'Всички полета са задължителни' });
            }

            if (password != confirmPassword) {
                return res.render('users/register', { ...obj, error: 'Паролите не съвпадат' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const userObj = {
                username,
                email,
                password: hash,
            }

            await User.create(userObj);
            res.redirect('/users/login');
        }
    }
}