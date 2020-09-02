/* eslint-disable no-script-url */
import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { skjulLastNedPdfModal } from '../ducks/dokumenter.ts';
import NavFrontendModal from 'nav-frontend-modal'
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper'

import "./last-ned-pdf-modal.less"

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.deactivateModal = this.deactivateModal.bind(this);
    }

    deactivateModal() {
        const { actions } = this.props;
        setTimeout(actions.skjulLastNedPdfModal, 0);
    }

    render() {
        const { pdfModal, intl: { formatMessage } } = this.props;
        return (
            <NavFrontendModal
                isOpen={pdfModal.skalVises}
                contentLabel={formatMessage({ id: 'modal.lastnedpdf.aria.tittel' })}
                onRequestClose={this.deactivateModal}
            >
                <Alertstripe type="info" className="mininnboks-modal side-innhold last-ned-pdf-modal">
                    <div className="panel">
                        <h2 className="hode hode-innholdstittel hode-dekorert hode-advarsel blokk-s" >
                            <span className="vekk">{formatMessage({ id: 'modal.lastnedpdf.ikon.aria' })}</span>
                            {formatMessage({ id: 'modal.lastnedpdf.obs' })}
                        </h2>
                        <p className="blokk-s text-center">{formatMessage({ id: 'modal.lastnedpdf.tekst' })}</p>
                        <div className="knapperad knapperad-adskilt">
                            <div className="blokk-s">
                                <a
                                    target="_blank"
                                    href={pdfModal.dokumentUrl}
                                    className="knapp knapp--hoved"
                                    onClick={this.deactivateModal}
                                >
                                    {formatMessage({ id: 'modal.lastnedpdf.fortsett' })}
                                </a>
                            </div>
                            <Lenke role="button" href="javascript:void(0)" onClick={this.deactivateModal}>
                                {formatMessage({ id: 'modal.lastnedpdf.lukk' })}
                            </Lenke>
                        </div>
                    </div>
                </Alertstripe>
            </NavFrontendModal>
        );
    }
}

Modal.propTypes = {
    pdfModal: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    intl: intlShape
};

const mapStateToProps = ({ dokumenter }) => ({ pdfModal: dokumenter.pdfModal });
const mapDispatchToProps = (dispatch) => ({
    actions: {
        skjulLastNedPdfModal: () => dispatch(skjulLastNedPdfModal())
    }
});
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Modal);

export default injectIntl(connectedComponent);
