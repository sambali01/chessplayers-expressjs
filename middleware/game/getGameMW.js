/**
 * A :gameid azonosító segítségével betölt egy játszmát az adatbázisból.
 * Az eredményt a res.locals.game-be teszi.
 */
module.exports = (objectrepository) => {
    const GameModel = objectrepository.GameModel;

    return (req, res, next) => {
        GameModel.findOne({ _id: req.params.gameid }).then(game => {
            if (!game) {
                return res.redirect(`/gamelist/${res.locals.player._id}`);
            }
            res.locals.game = game;
            return next();
        }).catch(err => next(err));
    };
};