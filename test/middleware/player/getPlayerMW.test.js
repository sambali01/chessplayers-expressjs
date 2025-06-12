const expect = require('chai').expect;
const MW = require('../../../middleware/player/getPlayerMW');

describe('getPlayerMW', () => {
    it('should return a player from the database', (done) => {
        const mockObjRepo = {
            PlayerModel: {
                findOne: (param) => {
                    return Promise.resolve('mockplayerindb');
                }
            }
        }

        const reqMock = {
            params: {
                playerid: 'mockplayerid'
            }
        }

        const resMock = {
            locals: {}
        };

        const nextMock = () => {
            // itt van vége a tesztnek
            expect(resMock.locals.player).to.be.eql('mockplayerindb');
            done();
        }

        const mw = MW(mockObjRepo);
        mw(reqMock, resMock, nextMock);
    });

    it('should redirect to "/" if no player is found', (done) => {
        const mockObjRepo = {
            PlayerModel: {
                findOne: (param) => {
                    return Promise.resolve(null);
                }
            }
        };

        const reqMock = {
            params: {
                playerid: 'mockplayerid'
            }
        };

        const resMock = {
            locals: {},
            redirect: (path) => {
                expect(path).to.be.eql('/');
                done();
            }
        };

        const nextMock = () => {
            throw new Error("Next should not be called when redirecting");
        };

        const mw = MW(mockObjRepo);
        mw(reqMock, resMock, nextMock);
    });

    it('should call next with an error if database query fails', (done) => {
        const mockObjRepo = {
            PlayerModel: {
                findOne: (param) => {
                    return Promise.reject(new Error('Database error'));
                }
            }
        };

        const reqMock = {
            params: {
                playerid: 'mockplayerid'
            }
        };

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