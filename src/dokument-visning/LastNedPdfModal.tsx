import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import Alertstripe from 'nav-frontend-alertstriper';
import './last-ned-pdf-modal.less';
import { useAppState } from '../utils/custom-hooks';
import { Flatknapp } from 'nav-frontend-knapper';

function LastNedPdfModal({ apen, setApen }: { apen: boolean; setApen: (apen: boolean) => void }) {
    const pdfModal = useAppState((state) => state.dokumenter.pdfModal);
    const dokumentUrl = pdfModal.dokumentUrl;

    const lukkModal = () => {
        setApen(false);
    };

    return (
        <NavFrontendModal isOpen={apen} contentLabel={'Info'} onRequestClose={lukkModal}>
            <Alertstripe type="info" form="inline" className="mininnboks-modal side-innhold last-ned-pdf-modal">
                <div className="panel">
                    <h2 className="hode hode-innholdstittel hode-dekorert hode-advarsel blokk-s">
                        <span className="vekk">Info</span>
                        OBS!
                    </h2>
                    <p className="blokk-s text-center">En kopi av dokumentet vil bli lagret på enheten din</p>
                    <div className="knapperad knapperad-adskilt">
                        <div className="blokk-s">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={dokumentUrl as string}
                                className="knapp knapp--hoved"
                                onClick={lukkModal}
                            >
                                Fortsett
                            </a>
                        </div>
                        <Flatknapp role="button" onClick={lukkModal}>
                            Avbryt
                        </Flatknapp>
                    </div>
                </div>
            </Alertstripe>
        </NavFrontendModal>
    );
}

export default LastNedPdfModal;
