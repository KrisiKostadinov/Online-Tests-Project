const Category = require("../models/Category");

module.exports = {
    get: {
        async all(req, res) {
            const categories = await Category.find().lean();
            res.render('categories/all', { page: 'Категории', categories });
        },
        add(req, res) {
            res.render('categories/add', { page: 'Нова категория' });
        },
    },
    post: {
        async add(req, res) {
            const { name } = req.body;

            if(name == '') {
                return res.render('categories/all', { page: 'Нова категория', error: 'Това поле е задължително' });
            }

            await Category.create({ name });
            res.redirect('/categories/all');
        }
    }
}