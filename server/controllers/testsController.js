const Category = require('../models/Category');
const Test = require('../models/Test');
const uuid = require('uuid');

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
                const test = await Test.findById(id).lean().populate('category');
                res.render('tests/details', { page: test.title, test });
            } catch (error) {
                res.render('404');
            }
        },

        async createQuestion(req, res) {
            const { testId } = req.params;

            try {
                const test = await Test.findById(testId).lean().populate('category');
                res.render('tests/questions/create', { page: test.title, test });
            } catch (error) {
                res.render('404');
            }
        },

        async createAnswerToQuestion(req, res) {
            const { questionId, testId } = req.params;

            try {
                const questions = await Test.findById('6230725d0c1398a39ac7ec49').select({ 'questions._id': questionId });
                console.log(question);
                res.render('tests/answers/create', { page: 'Нов отговор', question });
            } catch (error) {
                res.render('404');
            }
        }
    },

    post: {
        async create(req, res) {
            const { title, categoryId } = req.body;
            if (categoryId == '' || title == '') {
                const categories = await Category.find().lean();
                return res.render('tests/create', { page: 'Нов тест', error: 'Изберете категория и заглавие на теста.', title, categoryId, categories });
            }

            const createdTest = {
                title: title,
                categoryId: categoryId,
                questions: []
            }

            const test = await Test.create(createdTest);
            res.redirect('/tests/details/' + test._id);
        },

        async createQuestion(req, res) {
            const { testId } = req.params;
            const { title } = req.body;
            
            if (title == '') {
                return res.redirect('/tests/questions/create/' + testId);
            }

            await Test.updateOne({ _id: testId }, {
                $push: {
                    questions: [{
                        _id: uuid.v1(),
                        title: title,
                        answers: [],
                    }]
                }
            });

            res.redirect('/tests/answers/create/' + testId);
        },

        async createAnswerToQuestion(req, res) {
            const questionId = req.params.id;
            const { content, isCorrect } = req.body;

            if (content == '') {
                return res.render('tests/answers/create', { page: 'Нов отговор', content });
            }

            console.log(questionId, content, isCorrect);
            await Test.updateOne(
                {
                    'questions._id': questionId,
                },
                {
                    $push: {
                        answers: [{
                            content,
                            isCorrect,
                        }]
                    }
                }
            );

            res.redirect('/tests/answers/create/' + questionId);
        }
    },

    remove: {
        async byId(req, res) {
            const { id } = req.params;

            await Test.findByIdAndDelete(id);
            res.status(200).send();
        }
    }
}