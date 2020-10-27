import * as React from 'react';
import { useDispatch } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper';
import './last-ned-pdf-modal.less';
import { skjulLastNedPdfModal } from '../ducks/dokumenter';
import { useAppState } from '../utils/custom-hooks';

function LastNedPdfModal() {
    const dispatch = useDispatch();
    const pdfModal = useAppState((state) => state.dokumenter.pdfModal);

    const deactivateModal = () => {
        setTimeout(dispatch(skjulLastNedPdfModal), 0);
    };

    return (
        <NavFrontendModal isOpen={pdfModal.skalVises} contentLabel={'Info'} onRequestClose={deactivateModal}>
            <Alertstripe type="info" className="mininnboks-modal side-innhold last-ned-pdf-modal">
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
                                href={pdfModal.dokumentUrl as string}
                                className="knapp knapp--hoved"
                                onClick={deactivateModal}
                            >
                                Fortsett
                            </a>
                        </div>
                        <Lenke role="button" href="javascript:void(0)" onClick={deactivateModal}>
                            Avbryt
                        </Lenke>
                    </div>
                </div>
            </Alertstripe>
        </NavFrontendModal>
    );
}

export default LastNedPdfModal;
