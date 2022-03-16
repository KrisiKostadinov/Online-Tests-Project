const express = require('express');
const router = express();
const { get, post } = require('../controllers/homeController');
const protectPages = require('../config/protectPages');

router.get('/', protectPages.loggedIn, get.home);

router.post('/themeColor', post.color);

module.exports = router;