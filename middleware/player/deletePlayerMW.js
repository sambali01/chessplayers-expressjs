/**
 * A res.locals.player segítségével eltávolít egy játékost az adatbázisból.
 * Sikeres művelet esetén átirányít a / route-ra.
 */
module.exports = (objectrepository) => {
    const GameModel = objectrepository.GameModel;

    return (req, res, next) => {
        if (typeof res.locals.player === 'undefined') {
            return next();
        }

        GameModel.deleteMany({ _player: res.locals.player._id }).then(() => {
            return res.locals.player.deleteOne();
        }).then(() => {
            return res.redirect('/');
        }).catch(err => next(err));
    };
};