const express = require('express');
const router = express();
const { get, post, remove } = require('../controllers/categoryController');
const protectPages = require('../config/protectPages');

router.get('/all', protectPages.loggedIn, get.all);
router.get('/add', protectPages.loggedIn, get.add);

router.post('/add', protectPages.loggedIn, post.add);

router.post('/remove', protectPages.loggedIn, protectPages.isAdministrator, remove.byId);

module.exports = router;