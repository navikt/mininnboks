import * as React from 'react';
import { FormEvent } from 'react';
import Modal from 'nav-frontend-modal';
import { Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import './betingelser.less';

interface Props {
    godkjennVilkaar: () => void;
    avbryt: () => void;
    visModal: boolean;
    lukkModal: () => void;
}

function Betingelser(props: Props) {
    const submit = (event: FormEvent) => {
        event.preventDefault();
    };
    return (
        <Modal
            isOpen={props.visModal}
            onRequestClose={props.lukkModal}
            contentClass="betingelser"
            contentLabel={'Betingelser'}
        >
            <form onSubmit={submit} className="betingelser-panel panel side-innhold">
                <Sidetittel className="text-center blokk-l" tabIndex={0}>
                    Vilkårene for å bruke denne tjenesten
                </Sidetittel>
                <div className="blokk-m">
                    <p>
                        <strong>Henvendelsen gjelder deg</strong> Denne tjenesten gjelder deg som privatperson. Du kan
                        ikke bruke den på vegne av andre. Det du informerer om deg selv vil kunne få betydning for
                        rettighetene dine hos NAV.
                    </p>
                    <p>
                        Skal du sende inn en søknad, dokumenter eller klage på vedtak, må du bruke{' '}
                        <a className="lopendetekst" href="https://www.nav.no/no/skjema/skjemaer">
                            skjemaveilederen
                        </a>
                        .
                    </p>
                    <p>
                        {' '}
                        <strong>Opplysningene blir holdt konfidensielt</strong> Opplysningene vil bli behandlet på en
                        sikker måte. De er bare tilgjengelige for ansatte i NAV som skal svare på henvendelsen din, og
                        som skal hjelpe deg hvis du kontakter oss en annen gang.
                    </p>
                </div>
                <hr className="blokk-m" />
                <div className="svar-godta text-center blokk-m">
                    <Hovedknapp htmlType="submit" aria-controls="betingelser" onClick={props.godkjennVilkaar}>
                        Jeg godtar vilkårene
                    </Hovedknapp>
                </div>
                <div className="text-center">
                    <a href="javascript:void(0)" onClick={props.avbryt} aria-controls="betingelser" role="button">
                        Jeg godtar ikke vilkårene
                    </a>
                </div>
            </form>
        </Modal>
    );
}

export default Betingelser;
