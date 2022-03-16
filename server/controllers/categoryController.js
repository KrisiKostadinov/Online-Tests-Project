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
        async remove(req, res) {
            const { id } = req.params;

            const category = await Category.findById(id);
            res.render('categoires/remove', { page: 'Истрий категорията', category });
        }
    },

    post: {
        async add(req, res) {
            const { name } = req.body;

            if(name == '') {
                return res.render('categories/add', { page: 'Нова категория', error: 'Това поле е задължително' });
            }

            await Category.create({ name });
            res.redirect('/categories/all');
        }
    },

    remove: {
        async byId(req, res) {
            const id = req.body.id;

            await Category.findByIdAndDelete(id);
            res.redirect(req.get('referer'));
        }
    }
}