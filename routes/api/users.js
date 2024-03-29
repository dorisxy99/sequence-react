const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedin');


// POST /api/users
router.post('/login', usersCtrl.login);

router.post('/', usersCtrl.signup);

// GET /api/users/check-token

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;