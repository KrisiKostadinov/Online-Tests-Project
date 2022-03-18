const Question = require('../models/Question');
const Test = require('../models/Test');

module.exports = {
    get: {
        async create(req, res) {
            const { testId } = req.params;

            try {

                const test = await Test.findById(testId).lean();
                const questions = await Question.find({ test: testId }).lean();

                if (!test) {
                    return res.redirect('/404');
                }

                res.render('questions/create', { page: 'Нов въпрос', test, questions });

            } catch (error) {
                res.render('404');
            }
        },

        // all(req, res) {
        //     const { testId } = req.params;

        //     const questions = await Question.find({ test: testId });

        //     res.

        // },

        async createAnswer(req, res) {
            const { questionId } = req.params;

            const question = await Question.findById(questionId).lean().populate('test');

            if (!question) {
                return res.redirect('/404');
            }

            res.render('questions/answers/create', { page: 'Нов отговор', question });
        }
    },

    post: {
        async create(req, res) {
            const { testId } = req.params;
            const { title } = req.body;

            if (title == '') {
                const test = await Test.findById(testId).lean();
                const questions = await Question.find({ test: testId }).lean();

                if (!test) {
                    return res.redirect('/404');
                }

                return res.render('questions/create', { page: 'Нов въпрос', test, questions, error: 'Моля, попълнете полето.' });
            }

            const question = await Question.create({
                title: title,
                test: testId,
            });

            await Test.findByIdAndUpdate(
                {
                    _id: testId,
                },
                {
                    $push: {
                        questions: {
                            _id: question._id,
                        }
                    }
                }
            );

            res.redirect('/questions/answers/create/' + question._id);
        },

        async createAnswer(req, res) {
            const { questionId } = req.params;
            const content = req.body.content;
            const isCorrect = req.body.isCorrect == 'on' ? true : false;

            if(content == '') {
                const question = await Question.findById(questionId).lean().populate('test');
                return res.render('questions/answers/create', { page: 'Нов отговор', question, error: 'Моля, попълнете полето.' });
            }

            await Question.findOneAndUpdate(
                {
                    _id: questionId
                },
                {
                    $push: {
                        answers: {
                            content,
                            isCorrect
                        }
                    }
                },
                {
                    new: true,
                });

            res.redirect('/questions/answers/create/' + questionId);
        }
    }
}