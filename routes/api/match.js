const express = require('express');
const router = express.Router();
const matchCtrl = require('../../controllers/api/match');


// POST /api/match
router.post('/', matchCtrl.createMatch);

// GET /api/match/check-token
router.get('/:id', matchCtrl.getMatch);
router.get('/', matchCtrl.getAllMatches);

module.exports = router;