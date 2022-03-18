const express = require('express');
const router = express();
const { post } = require('../../api/adminController');
const protectPages = require('../../config/protectPages');

router.post('/login', protectPages.loggedOut, post.login);

module.exports = router;