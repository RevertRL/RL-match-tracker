var express = require('express');
var router = express.Router();

const playerController = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerController.index);
router.post('/', ensureLoggedIn, playerController.createPlayer);
router.delete('/:id', playerController.deletePlayer);
router.post('/:id/matches', ensureLoggedIn, playerController.createMatchForPlayer);
router.delete('/:playerId/matches/:matchId', playerController.deleteMatchForPlayer);


module.exports = router;
