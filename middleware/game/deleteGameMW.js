/**
 * A res.locals.game segítségével eltávolít egy játszmát az adatbázisból.
 * Sikeres művelet esetén átirányít a /gamelist/:playerid route-ra.
 */
module.exports = (objectrepository) => {
    return (req, res, next) => {
        if (typeof res.locals.game === 'undefined') {
            return next();
        }

        res.locals.game.deleteOne().then(() => {
            return res.redirect(`/gamelist/${res.locals.player._id}`);
        }).catch(err => next(err));
    };
};