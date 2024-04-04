var express = require('express');
var router = express.Router();

const playerController = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerController.index);
router.get('/new', playerController.new)
router.get('/:id', playerController.show);
router.post('/new', ensureLoggedIn, playerController.new);
router.post('/:id', playerController.delete);
router.post('player/:id/matches', ensureLoggedIn, playerController.matches);



module.exports = router;
