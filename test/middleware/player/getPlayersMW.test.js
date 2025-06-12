const expect = require('chai').expect;
const MW = require('../../../middleware/player/getPlayersMW');

describe('getPlayersMW', function () {
    it('should load all players from the database and store them in res.locals.players', (done) => {
        const mockObjRepo = {
            PlayerModel: {
                find: () => {
                    return Promise.resolve(['player1', 'player2', 'player3']);
                }
            }
        };

        const reqMock = {};

        const resMock = {
            locals: {}
        };

        const nextMock = () => {
            expect(resMock.locals.players).to.be.an('array');
            expect(resMock.locals.players).to.have.length(3);
            expect(resMock.locals.players).to.include('player1');
            expect(resMock.locals.players).to.include('player2');
            expect(resMock.locals.players).to.include('player3');
            done();
        };

        const mw = MW(mockObjRepo);
        mw(reqMock, resMock, nextMock);
    });

    it('should call next with an error if database query fails', (done) => {
        const mockObjRepo = {
            PlayerModel: {
                find: () => {
                    return Promise.reject(new Error('Database error'));
                }
            }
        };

        const reqMock = {};

        const resMock = {
            locals: {}
        };

        const nextMock = (err) => {
            expect(err).to.be.an('error');
            expect(err.message).to.be.eql('Database error');
            done();
        };

        const mw = MW(mockObjRepo);
        mw(reqMock, resMock, nextMock);
    });
});
