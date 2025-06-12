const Schema = require('mongoose').Schema;
const db = require('../config/db');

const PlayerSchema = new Schema({
    name: Schema.Types.String,
    birth_year: Schema.Types.Number,
    rating: Schema.Types.Number
});

const Player = db.model('Player', PlayerSchema);

module.exports = Player;