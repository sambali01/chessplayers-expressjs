/**
 * A :playerid azonosító segítségével betölt egy játékost az adatbázisból.
 * Az eredményt a res.locals.player-be teszi.
 */
module.exports = (objectrepository) => {
    const PlayerModel = objectrepository.PlayerModel;

    return (req, res, next) => {
        PlayerModel.findOne({ _id: req.params.playerid }).then(player => {
            if (!player) {
                return res.redirect('/');
            }
            res.locals.player = player;
            return next();
        }).catch(err => next(err));
    };
};