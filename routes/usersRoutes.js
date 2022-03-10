const express = require('express');
const router = express();
const { get, post } = require('../controllers/usersController');
const protectPages = require('../config/protectPages');

router.get('/login', protectPages.loggedOut, get.login);
router.get('/register', protectPages.loggedOut, get.register);

router.post('/login', protectPages.loggedOut, post.login);
router.post('/register', protectPages.loggedOut, post.register);

module.exports = router;