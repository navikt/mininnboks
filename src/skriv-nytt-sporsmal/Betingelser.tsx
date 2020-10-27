import * as React from 'react';
import { FormEvent } from 'react';
import Modal from 'nav-frontend-modal';
import { Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import './betingelser.less';
import FormattedHTMLMessage from '../utils/FormattedHTMLMessage';

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
                    <FormattedHTMLMessage id="send-sporsmal.still-sporsmal.betingelser.tekst" />
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
