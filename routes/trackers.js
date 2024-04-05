var express = require('express');
var router = express.Router();

const playerCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerCtrl.index);
router.get('/new', playerCtrl.new)
router.post('/', ensureLoggedIn, playerCtrl.create);
router.get('/:id', playerCtrl.show);
router.post('/:id/matches', ensureLoggedIn, playerCtrl.matches);
router.post('/:id', playerCtrl.delete);



module.exports = router;
