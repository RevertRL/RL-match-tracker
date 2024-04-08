const Player = require('../models/tracker');


async function index(req, res) {
    try {
        req.body.user = req.user._id
        const players = await Player.find();
        res.render('trackers/index', { players });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Server Error');
    }
}

async function create(req, res) {
    try {
        
        await Player.create(req.body);
        res.redirect('trackers');
    } catch (err) {
        console.log(err);
        res.render('trackers/new', { errorMsg: err.message });
    }
}

async function createMatch(req, res) {
    try {
        const playerId = req.params.id;
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).send('Player not found');
        }
        
        player.matches.push(req.body);
        await player.save();
        
        res.redirect(`/trackers/${player._id}`);
    } catch (err) {
        console.error('Error creating match:', err);
        res.status(500).send('Internal Server Error');
    }
}

function newPlayer(req, res) {
    const player = {
        matches: []
    };
    res.render('trackers/new', { player });
}

async function showAll(req, res) {
    try {
        const players = await Player.find();
        res.render('trackers/show', { players });
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).send('Internal Server Error');
    }
}


async function showMatches(req, res) {
    try {
        const playerId = req.params.id;
        const player = await Player.findById(playerId).populate('matches');
        console.log(player);
        if (!player) {
            return res.status(404).send('Player not found');
        }
        res.render('trackers/showMatches', { player });
    } catch (err) {
        console.error('Error fetching player and matches:', err);
        res.status(500).send('Internal Server Error');
    }}

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
    createMatch,
    showAll,
    showMatches,
    delete: deletePlayer
};
