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
            if (tests.length === 0) {
                return res.render('tests/all', { page: 'Тестове ', error: 'Няма тестове за показване.' });
            }
            res.render('tests/all', { page: 'Тестове ', tests });
        },

        async byId(req, res) {
            const { id } = req.params;

            try {
                const test = await Test.findById(id).lean().populate('category').populate('questions');
                res.render('tests/details', { page: test.title, test });
            } catch (error) {
                res.render('404');
            }
        },
    },

    post: {
        async create(req, res) {
            const { title, categoryId, description } = req.body;

            if (categoryId == '' || title == '') {
                const categories = await Category.find().lean();
                return res.render('tests/create', { page: 'Нов тест', error: 'Изберете категория и заглавие на теста.', title, description, categories });
            }

            const test = await Test.create({
                title: title,
                description: description,
                category: categoryId,
            });

            res.redirect('/tests/details/' + test._id);
        },
    },

    remove: {
        async byId(req, res) {
            const { id } = req.params;

            await Test.findByIdAndDelete(id);
            res.status(200).send();
        }
    }
}