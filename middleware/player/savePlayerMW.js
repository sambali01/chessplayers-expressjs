/**
 * A POST paramétereinek segítségével frissít vagy elment egy új játékost az adatbázisba.
 * Ha létezik a res.locals.player, akkor frissítés, ha nem, akkor új elem beszúrása történik.
 * Sikeres művelet esetén átirányít a / route-ra.
 */
module.exports = (objectrepository) => {
    const PlayerModel = objectrepository.PlayerModel;

    return (req, res, next) => {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.birth_year === 'undefined' ||
            typeof req.body.rating === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.player === 'undefined') {
            res.locals.player = new PlayerModel();
        }

        res.locals.player.name = req.body.name;
        res.locals.player.birth_year = req.body.birth_year;
        res.locals.player.rating = req.body.rating;

        return res.locals.player.save().then(() => {
            return res.redirect('/');
        }).catch(err => next(err));
    };
};