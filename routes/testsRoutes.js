const express = require('express');
const router = express();
const { get, post } = require('../controllers/testsController');
const protectPages = require('../config/protectPages');

router.get('/create', protectPages.loggedIn, get.create);
router.get('/details/:id', protectPages.loggedIn, protectPages.checkIsAdmin, get.byId);
router.get('/all', protectPages.loggedIn, get.list);

router.post('/create', protectPages.loggedIn, post.create);

module.exports = router;