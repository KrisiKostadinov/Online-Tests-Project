const { findOne } = require("../models/User");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    get: {
        home(req, res) {
            // res.render('home', { page: 'Home', title: 'Hello' });
            res.redirect('/categories/all');
        },
    },
    post: {
        async color(req, res) {
            const user = await User.findOne({ email: req.body.email });

            const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, {
                themeColor: user.themeColor == 'light' ? 'dark' : 'light',
            },
                { new: true });

            const token = jwt.sign({
                email: updatedUser.email,
                name: updatedUser.username,
                themeColor: updatedUser.themeColor,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            res.clearCookie('userToken');
            res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 });

            res.redirect(req.get('referer'));
        }
    }
}