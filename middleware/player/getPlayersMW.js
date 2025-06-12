/**
 * Betölt minden játékost az adatbázisból.
 * Az eredményt a res.locals.players-be teszi.
 */
module.exports = (objectrepository) => {
    const PlayerModel = objectrepository.PlayerModel;

    return (req, res, next) => {
        PlayerModel.find({}).then(players => {
            res.locals.players = players;
            return next();
        }).catch(err => next(err));
    };
};