const express = require('express');
const router = express();
const { get, post, remove } = require('../controllers/testsController');
const protectPages = require('../config/protectPages');

router.get('/create', protectPages.loggedIn, get.create);
router.get('/details/:id', protectPages.loggedIn, protectPages.checkIsAdmin, get.byId);
router.get('/all', protectPages.loggedIn, get.list);
router.get('/questions/create/:testId', protectPages.loggedIn, protectPages.isAdministrator, get.createQuestion);
router.get('/answers/create/:questionId', protectPages.loggedIn, protectPages.isAdministrator, get.createAnswerToQuestion);

router.post('/create', protectPages.loggedIn, post.create);
router.post('/questions/create/:testId', protectPages.loggedIn, protectPages.isAdministrator, post.createQuestion);

router.delete('/remove/:id', protectPages.loggedIn, remove.byId);

module.exports = router;