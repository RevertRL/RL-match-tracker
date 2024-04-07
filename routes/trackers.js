var express = require('express');
var router = express.Router();

const playerCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerCtrl.index);
router.get('/new', playerCtrl.new)
router.post('/', ensureLoggedIn, playerCtrl.create);
router.post('/:id/createMatches', playerCtrl.createMatch);
// router.post('/:id/matches', ensureLoggedIn, playerCtrl.matches);
router.get('/:id', playerCtrl.showAll);
router.get('/:id/showMatches', playerCtrl.showMatches);
router.post('/:id', playerCtrl.delete);



module.exports = router;
