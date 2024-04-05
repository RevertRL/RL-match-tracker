var express = require('express');
var router = express.Router();

const playerCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', playerCtrl.index);
router.get('/new', playerCtrl.new)
router.post('/', ensureLoggedIn, playerCtrl.create);
router.get('/show', playerCtrl.show);
router.post('/matches', ensureLoggedIn, playerCtrl.matches);
router.post('/:id', playerCtrl.delete);



module.exports = router;
