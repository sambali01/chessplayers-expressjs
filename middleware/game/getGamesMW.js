/**
 * Betölt minden játszmát az adatbázisból.
 * Az eredményt a res.locals.games-be teszi.
 */
module.exports = (objectrepository) => {
    const GameModel = objectrepository.GameModel;

    return (req, res, next) => {
        if (typeof res.locals.player === 'undefined') {
            return next();
        }

        GameModel.find({ _player: res.locals.player._id }).then(games => {
            res.locals.games = games;
            return next();
        }).catch(err => next(err));
    };
};