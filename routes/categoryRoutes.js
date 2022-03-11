const express = require('express');
const router = express();
const { get, post } = require('../controllers/categoryController');
const protectPages = require('../config/protectPages');

router.get('/all', protectPages.loggedIn, get.all);
router.get('/add', protectPages.loggedIn, get.add);

router.post('/add', protectPages.loggedIn, post.add);

module.exports = router;