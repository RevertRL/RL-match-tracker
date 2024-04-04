const Player = require('../models/tracker');
const Match = require('../models/tracker');

async function index(req, res) {
    try {
        const players = await Player.find();
        const matches = await Match.find();
        res.render('trackers/index', { players: players, matches: matches });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Server Error');
    }
}

  async function create(req, res) {
    try {
      await Player.create(req.body);
      res.redirect('/trackers');
    } catch (err) {
      console.log(err);
      res.render('trackers/new', { errorMsg: err.message });
    }
  }
  function newPlayer(req, res) {
    const player = {
        matches : []
    };
    res.render('trackers/new', { player });
  }

  async function show(req, res) {
    try {
        const playerId = req.params.id;
        const player = await Player.findById(playerId); // Correct reference to Player model
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.render('trackers/show', { player }); // Render the show.ejs file with the player details
    } catch (err) {
        console.error('Error finding player:', err);
        res.status(500).send('Server Error');
    }
}

  async function matches(req, res) {
    try {
      const match = await Match.findById(req.params.id);
      if (!match) {
        return res.status(404).send('Match not found');
      }
  
      player.match.push(req.body);
      await match.save();
  
      res.redirect(`/trackers/${match._id}`);
    } catch (err) {
      console.error('Error finding or saving match:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  const deletePlayer = async (req, res) => {
    const playerId = req.params.id;
  
    try {
      await Player.findByIdAndDelete(playerId);
      res.status(204).redirect('/')
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

