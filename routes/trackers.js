var express = require('express');
var router = express.Router();

const playerCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerCtrl.index);
router.get('/new', playerCtrl.new)
router.get('/:id', playerCtrl.show);
router.post('/', ensureLoggedIn, playerCtrl.create);
router.post('/:id', playerCtrl.delete);
router.post('/players/:id/matches', ensureLoggedIn, playerCtrl.matches);



module.exports = router;
