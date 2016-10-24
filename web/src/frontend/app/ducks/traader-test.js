/* eslint-env mocha */
import reducer, * as E from './traader';
import { expect } from 'chai';

function lagTraad(traadId, antallMeldinger) {
    const meldinger = new Array(antallMeldinger)
        .fill(0)
        .map((_, index) => ({
            id: `id${index + 1}`,
            traadId,
            lest: false
        }));

    return ({
        traadId,
        meldinger,
        nyeste: meldinger[0],
        eldste: meldinger[meldinger.length - 1]
    });
}

describe('traader-ducks', () => {
    describe('reducer', () => {
        it('skal oppdatere alle meldinger med med rett traadId med status lest', () => {
            const initialState = { data: [lagTraad('traad1', 2), lagTraad('traad2', 2)] };

            const markertSomLest = reducer(initialState, {
                type: E.MARKERT_SOM_LEST_OK,
                data: {
                    traadId: 'traad1'
                }
            });

            function harUlestMelding(meldinger) {
                const lestArray = meldinger.filter((melding) => (melding.lest));
                return lestArray[0] === undefined;
            }

            function erAlleMeldingerLest(traadId) {
                return markertSomLest.data
                    .filter((traad) => (traad.traadId === traadId))
                    .map((traad) => (traad.meldinger))
                    .filter(harUlestMelding);
            }

            expect(erAlleMeldingerLest('traad1')).to.deep.equal([]);
            expect(erAlleMeldingerLest('traad2')).to.not.deep.equal([]);
        });
    });
});

