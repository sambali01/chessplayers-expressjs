const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chess_players_and_games');

module.exports = mongoose;