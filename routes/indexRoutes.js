const express = require('express');
const router = express();
const { get, post } = require('../controllers/homeController');

router.get('/', get.home);

router.post('/themeColor', post.color);

module.exports = router;