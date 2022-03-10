const express = require('express');
const router = express();
const { get, post } = require('../controllers/usersController');

router.get('/login', get.login);
router.get('/register', get.register);

router.post('/login', post.login);
router.post('/register', post.register);

module.exports = router;