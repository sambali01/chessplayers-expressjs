/**
 * A POST paramétereinek segítségével frissít vagy elment egy új játszmát az adatbázisba.
 * Ha létezik a res.locals.game, akkor frissítés, ha nem, akkor új elem beszúrása történik.
 * Sikeres művelet esetén átirányít a /gamelist/:playerid route-ra.
 */
module.exports = (objectrepository) => {
    const GameModel = objectrepository.GameModel;

    return (req, res, next) => {
        if (
            typeof req.body.color === 'undefined' ||
            typeof req.body.move_count === 'undefined' ||
            typeof req.body.result === 'undefined' ||
            typeof res.locals.player === 'undefined'
        ) {
            return next();
        }

        // Validáljuk a színt és az eredményt
        if (!res.locals.validColors.includes(req.body.color)) {
            return next(new Error('Nem érvényes színt akarunk elmenteni!'));
        }
        if (!res.locals.validResults.includes(req.body.result)) {
            return next(new Error('Nem érvényes eredményt akarunk elmenteni!'));
        }

        if (typeof res.locals.game === 'undefined') {
            res.locals.game = new GameModel();
        }

        res.locals.game.color = req.body.color;
        res.locals.game.move_count = req.body.move_count;
        res.locals.game.result = req.body.result;
        res.locals.game._player = res.locals.player._id;

        return res.locals.game.save().then(() => {
            return res.redirect(`/gamelist/${res.locals.player._id}`);
        }).catch(err => next(err));
    };
};