const Category = require('../models/Category');
const Test = require('../models/Test');

module.exports = {
    get: {
        async create(req, res) {
            const categories = await Category.find().lean();
            res.render('tests/create', { page: 'Нов тест', categories });
        },

        async list(req, res) {
            const tests = await Test.find().lean();
            res.render('tests/all', { page: 'Тестове ', tests });
        },

        async byId(req, res) {
            const { id } = req.params;

            const test = await Test.findById(id).lean().populate('category');
            res.render('tests/details', { page: test.title, test });
        }
    },

    post: {
        async create(req, res) {
            const { title, categoryId } = req.body;
            if(categoryId == '') {
                return res.render('tests/create', { page: 'Нов тест', error: 'Изберете категория' });
            }
            const test = await Test.create({ title, categoryId });
            res.redirect('/tests/details/' + test._id);
        }
    }
}