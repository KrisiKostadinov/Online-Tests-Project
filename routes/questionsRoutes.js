const express = require('express');
const router = express();
const { get, post } = require('../controllers/questionsController');
const protectPages = require('../config/protectPages');

router.get('/create/:testId', protectPages.loggedIn, get.create);
router.get('/answers/create/:questionId', protectPages.loggedIn, get.createAnswer);
// router.get('/all/:testId', protectPages.loggedIn, get.all);

router.post('/create/:testId', protectPages.loggedIn, post.create);
router.post('/answers/create/:questionId', protectPages.loggedIn, post.createAnswer);

module.exports = router;