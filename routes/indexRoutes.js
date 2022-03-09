const express = require('express');
const router = express();
const { get } = require('../controllers/homeController');

router.get('/', get.home);

module.exports = router;