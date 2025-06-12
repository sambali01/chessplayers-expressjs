const Schema = require('mongoose').Schema;
const db = require('../config/db');

const GameSchema = new Schema({
    color: Schema.Types.String,
    move_count: Schema.Types.Number,
    result: Schema.Types.String,
    _player: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }
});

const Game = db.model('Game', GameSchema);

module.exports = Game;