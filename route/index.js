const renderMW = require('../middleware/renderMW')
const deleteGameMW = require('../middleware/game/deleteGameMW')
const getGameConstantsMW = require('../middleware/game/getGameConstantsMW')
const getGameMW = require('../middleware/game/getGameMW')
const getGamesMW = require('../middleware/game/getGamesMW')
const saveGameMW = require('../middleware/game/saveGameMW')
const deletePlayerMW = require('../middleware/player/deletePlayerMW')
const getPlayerMW = require('../middleware/player/getPlayerMW')
const getPlayersMW = require('../middleware/player/getPlayersMW')
const savePlayerMW = require('../middleware/player/savePlayerMW')

const PlayerModel = require('../models/player');
const GameModel = require('../models/game');

module.exports = (app) => {
    const objRepo = {
        PlayerModel: PlayerModel,
        GameModel: GameModel
    };

    app.get('/',
        getPlayersMW(objRepo),
        renderMW(objRepo, 'players')
    );
    app.use('/player/new',
        savePlayerMW(objRepo),
        renderMW(objRepo, 'player-form')
    );
    app.use('/player/edit/:playerid',
        getPlayerMW(objRepo),
        savePlayerMW(objRepo),
        renderMW(objRepo, 'player-form')
    );
    app.get('/player/delete/:playerid',
        getPlayerMW(objRepo),
        deletePlayerMW(objRepo)
    );

    app.get('/gamelist/:playerid',
        getPlayerMW(objRepo),
        getGamesMW(objRepo),
        renderMW(objRepo, 'games')
    );
    app.use('/game/new/:playerid',
        getGameConstantsMW(objRepo),
        getPlayerMW(objRepo),
        saveGameMW(objRepo),
        renderMW(objRepo, 'game-form')
    );
    app.use('/game/edit/:playerid/:gameid',
        getGameConstantsMW(objRepo),
        getPlayerMW(objRepo),
        getGameMW(objRepo),
        saveGameMW(objRepo),
        renderMW(objRepo, 'game-form')
    );
    app.get('/game/delete/:playerid/:gameid',
        getPlayerMW(objRepo),
        getGameMW(objRepo),
        deleteGameMW(objRepo)
    );
};