/* eslint-disable no-script-url */
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {InjectedIntl, injectIntl} from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal'
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper'
import "./last-ned-pdf-modal.less"
import { skjulLastNedPdfModal } from 'ducks/dokumenter';
import {useAppState} from "../utils/custom-hooks";

interface Props {
    intl: InjectedIntl
}

function LastNedPdfModal (props: Props) {
        const dispatch = useDispatch();
        const pdfModal = useAppState((state) => state.dokumenter.pdfModal);

        const deactivateModal = () => {
            setTimeout(dispatch(skjulLastNedPdfModal), 0);
        }

        return (
            <NavFrontendModal
                isOpen={pdfModal.skalVises}
                contentLabel={props.intl.formatMessage({ id: 'modal.lastnedpdf.aria.tittel' })}
                onRequestClose={deactivateModal}
            >
                <Alertstripe type="info" className="mininnboks-modal side-innhold last-ned-pdf-modal">
                    <div className="panel">
                        <h2 className="hode hode-innholdstittel hode-dekorert hode-advarsel blokk-s" >
                            <span className="vekk">{props.intl.formatMessage({ id: 'modal.lastnedpdf.ikon.aria' })}</span>
                            {props.intl.formatMessage({ id: 'modal.lastnedpdf.obs' })}
                        </h2>
                        <p className="blokk-s text-center">{props.intl.formatMessage({ id: 'modal.lastnedpdf.tekst' })}</p>
                        <div className="knapperad knapperad-adskilt">
                            <div className="blokk-s">
                                <a
                                    target="_blank"
                                    href={pdfModal.dokumentUrl}
                                    className="knapp knapp--hoved"
                                    onClick={deactivateModal}
                                >
                                    {props.intl.formatMessage({ id: 'modal.lastnedpdf.fortsett' })}
                                </a>
                            </div>
                            <Lenke role="button" href="javascript:void(0)" onClick={deactivateModal}>
                                {props.intl.formatMessage({ id: 'modal.lastnedpdf.lukk'})}
                            </Lenke>
                        </div>
                    </div>
                </Alertstripe>
            </NavFrontendModal>
        );
}

export default injectIntl(LastNedPdfModal);
