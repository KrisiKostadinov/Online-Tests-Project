const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    get: {
        login(req, res) {
            res.render('users/login', { page: 'Вход', themeColor: 'bg-light' });
        },
        register(req, res) {
            res.render('users/register', { page: 'Регистрация', themeColor: 'bg-light' });
        },
        logout(req, res) {
            res.clearCookie('userToken');
            res.redirect('/users/login');
        },
        account(req, res) {
            res.render('users/account', { page: 'Моят профил' });
        }
    },
    post: {
        async login(req, res) {
            const { email, password } = req.body;

            const obj = {
                page: '',
                themeColor: 'bg-light',
                email,
                password,
            }

            if (email == '' || password == '') {
                return res.render('users/login', { ...obj, error: 'Всички полета са задължителни' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.render('users/login', { ...obj, error: 'Невалиден имеил или парола' });
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                return res.render('users/login', { ...obj, error: 'Невалиден имеил или парола' });
            }

            const token = jwt.sign({
                email,
                name: user.username,
                roles: user.roles,
                themeColor: user.themeColor,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 });
            res.redirect('/');
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

            const isExists = await User.findOne({ email });

            if (isExists) {
                return res.render('users/register', { ...obj, error: 'Вече има потребител с този имейл' });
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