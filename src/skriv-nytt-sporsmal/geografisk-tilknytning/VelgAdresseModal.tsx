import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import VelgAdresse from './VelgAdresse';
import { Adresse } from './AdresseUtils';
import './velgadresse-modal.less';

interface GtModalProps {
    isOpen: boolean;
    close(adresse: Adresse): void;
}

function VelgAdresseModal(props: GtModalProps) {
    return (
        <>
            <Modal
                contentClass="velgadresse__modal"
                contentLabel="Valg av adresse"
                isOpen={props.isOpen}
                closeButton={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onRequestClose={() => {}}
            >
                <h1>Adresse og NAV-kontor</h1>
                <Normaltekst className="blokk-xxs">
                    For å sikre at beskjeden komme frem til riktig kontor må man verifisere sin oppholdsadresse.
                </Normaltekst>
                <VelgAdresse submit={props.close} />
            </Modal>
        </>
    );
}

export default VelgAdresseModal;
