import reducer, { TraaderState, TypeKeys } from './traader';
import { MeldingsTyper } from '../utils/constants';
import { STATUS } from './ducks-utils';
import { AppState } from '../reducer';
import { Melding, Traad } from '../Traad';

function lagTraad(traadId: string, antallMeldinger: number): Traad {
    const meldinger: Array<Melding> = new Array(antallMeldinger).fill(0).map(
        (_, index) =>
            (({
                id: `id${index + 1}`,
                traadId,
                lest: false
            } as unknown) as Melding)
    );

    return {
        traadId: traadId,
        meldinger: meldinger,
        nyeste: meldinger[0],
        eldste: meldinger[meldinger.length - 1],
        kanBesvares: true,
        avsluttet: false
    };
}

describe('traader-ducks', () => {
    describe('reducer', () => {
        it('skal oppdatere alle meldinger med med rett traadId med status lest', () => {
            const initialState = ({
                status: STATUS.OK,
                innsendingStatus: STATUS.OK,
                data: [lagTraad('traad1', 2), lagTraad('traad2', 2)]
            } as unknown) as TraaderState;

            const markertSomLest = reducer(initialState, {
                type: TypeKeys.MARKERT_SOM_LEST_OK,
                data: {
                    traadId: 'traad1'
                }
            });

            function harUlestMelding(meldinger: Melding[]) {
                const lestArray = meldinger.filter((melding) => melding.lest);
                return lestArray[0] === undefined;
            }

            function erAlleMeldingerLest(traadId: string) {
                const traader = markertSomLest.status === STATUS.OK ? markertSomLest.data : [];
                return traader
                    .filter((traad) => traad.traadId === traadId)
                    .map((traad) => traad.meldinger)
                    .filter(harUlestMelding);
            }

            expect(erAlleMeldingerLest('traad1')).toEqual([]);
            expect(erAlleMeldingerLest('traad2')).not.toBe([]);
        });
    });
    describe('selector', () => {
        describe('traaderMedSammenslatteMeldinger', () => {
            const AVSLUTTENDE_SVAR_MELDINGS_ID = '3';
            const DELVIS_SVAR_TEKST = 'Jeg svarer på et delvis spørsmål';
            const SVAR_TEKST = 'Jeg avslutter det delvise spørsmålet ved å svare på oppgaven';
            const NYTT_SVAR_TEKST = 'Jeg stiller et helt nytt spørsmål';
            const initialState = ({
                traader: {
                    status: STATUS.OK,
                    data: [
                        {
                            meldinger: [
                                {
                                    id: '1',
                                    type: MeldingsTyper.SPORSMAL_SKRIFTLIG
                                },
                                {
                                    id: '2',
                                    type: MeldingsTyper.DELVIS_SVAR,
                                    fritekst: DELVIS_SVAR_TEKST
                                },
                                {
                                    id: AVSLUTTENDE_SVAR_MELDINGS_ID,
                                    type: MeldingsTyper.SVAR_SKRIFTLIG,
                                    fritekst: SVAR_TEKST
                                },
                                {
                                    id: '4',
                                    type: MeldingsTyper.SVAR_SKRIFTLIG,
                                    fritekst: NYTT_SVAR_TEKST
                                }
                            ]
                        }
                    ]
                }
            } as unknown) as AppState;
        });
    });
});
