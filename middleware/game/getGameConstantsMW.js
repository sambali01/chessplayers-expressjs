/**
 * A lehetséges szín tulajdonságokat a res.locals.validColors-be,
 * a lehetséges eredmény tulajdonságokat a res.locals.validResults-ba teszi.
 */
const gameConstants = require('../../models/gameConstants');

module.exports = (objectrepository) => {
    return (req, res, next) => {
        res.locals.validColors = gameConstants.validColors;
        res.locals.validResults = gameConstants.validResults;
        return next();
    };
};
