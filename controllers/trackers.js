const Player = require('../models/tracker');


 


async function index(req, res) {
    try {
        const players = await Player.find();
        res.render('trackers/player', { players });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

async function createPlayer(req, res){
    try {
        const { name, skillGroup, ranks } = req.body;
        const newPlayer = new Player({ name, skillGroup, ranks });
        await newPlayer.save();
        res.json(newPlayer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

async function deletePlayer(req, res){
    try {
        const playerId = req.params.id;
        const deletedPlayer = await Player.findByIdAndDelete(playerId);
        res.json(deletedPlayer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

async function createMatchForPlayer(req, res){
    try {
        const playerId = req.params.id;
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        const { type, result, details } = req.body;
        const newMatch = { type, result, details };
        player.matches.push(newMatch);
        await player.save();
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

async function deleteMatchForPlayer(req, res){
    try {
        const playerId = req.params.playerId;
        const matchId = req.params.matchId;
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        player.matches.id(matchId).remove();
        await player.save();
        res.json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    index,
    createPlayer,
    deletePlayer,
    createMatchForPlayer,
    deleteMatchForPlayer

}
