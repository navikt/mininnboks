import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper';
import './last-ned-pdf-modal.less';
import { skjulLastNedPdfModal } from '../ducks/dokumenter';
import { useAppState } from '../utils/custom-hooks';

function LastNedPdfModal() {
    const dispatch = useDispatch();
    const pdfModal = useAppState((state) => state.dokumenter.pdfModal);
    const intl = useIntl();

    const deactivateModal = () => {
        setTimeout(dispatch(skjulLastNedPdfModal), 0);
    };

    return (
        <NavFrontendModal
            isOpen={pdfModal.skalVises}
            contentLabel={intl.formatMessage({ id: 'modal.lastnedpdf.aria.tittel' })}
            onRequestClose={deactivateModal}
        >
            <Alertstripe type="info" className="mininnboks-modal side-innhold last-ned-pdf-modal">
                <div className="panel">
                    <h2 className="hode hode-innholdstittel hode-dekorert hode-advarsel blokk-s">
                        <span className="vekk">{intl.formatMessage({ id: 'modal.lastnedpdf.ikon.aria' })}</span>
                        {intl.formatMessage({ id: 'modal.lastnedpdf.obs' })}
                    </h2>
                    <p className="blokk-s text-center">{intl.formatMessage({ id: 'modal.lastnedpdf.tekst' })}</p>
                    <div className="knapperad knapperad-adskilt">
                        <div className="blokk-s">
                            <a
                                target="_blank"
                                href={pdfModal.dokumentUrl as string}
                                className="knapp knapp--hoved"
                                onClick={deactivateModal}
                            >
                                {intl.formatMessage({ id: 'modal.lastnedpdf.fortsett' })}
                            </a>
                        </div>
                        <Lenke role="button" href="javascript:void(0)" onClick={deactivateModal}>
                            {intl.formatMessage({ id: 'modal.lastnedpdf.lukk' })}
                        </Lenke>
                    </div>
                </div>
            </Alertstripe>
        </NavFrontendModal>
    );
}

export default LastNedPdfModal;
