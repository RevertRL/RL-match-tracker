const Player = require('../models/tracker');
const Match = require('../models/tracker');

async function index(req, res) {
    try {
        const players = await Player.find();
        res.render('trackers/', { players });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Server Error');
    }
}

  async function create(req, res) {
    try {
      req.body.user = req.user._id  
      await Player.create(req.body);
      res.redirect('/trackers');
    } catch (err) {
      console.log(err);
      res.render('trackers/new', { errorMsg: err.message });
    }
  }

  function newPlayer(req, res) {
    const player = {
        matches: []
    };
    res.render('trackers/new', { player });
  }

  async function show(req, res) {
    try {
        const player = await Player.find({user: req.user._id}) 
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.redirect('trackers/show', { players: player }); 
    } catch (err) {
        console.error('Error finding player:', err);
        res.status(500).send('Server Error');
    }
}

async function matches(req, res) {
    try {
        const playerId = req.params.id;
        
        const player = await Player.find(playerId);
        if (!player) {
            return res.status(404).send('Player not found');
        }
        
        player.matches.push(req.body);
        await player.save();
        
        res.redirect(`/trackers/${player._id}`);
    } catch (err) {
        console.error('Error finding or saving match:', err);
        res.status(500).send('Internal Server Error');
    }
}

  const deletePlayer = async (req, res) => {
    const playerId = req.params.id;
  
    try {
      await Player.findByIdAndDelete(playerId);
      res.redirect('/')
    } catch (error) {
      console.error('Error deleting player:', error);
      res.status(500).json({ error: 'Unable to delete player' });
    }
  };

  module.exports = {
    index,
    new: newPlayer,
    create,
    show,
    matches,
    delete: deletePlayer
  };

