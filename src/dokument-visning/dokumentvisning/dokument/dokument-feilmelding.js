import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Feilmelding from "../../../feilmelding/feilmelding";
import { Undertittel } from 'nav-frontend-typografi';

import './dokument-feilmelding.less'

function createMarkup(markuptekst) {
    return {
        __html: markuptekst
    };
}

class DokumentFeilmelding extends React.Component {
    render() {
        const { url, feilmelding, ekstrafeilinfo } = this.props;

        const enonicFeilmeldingstekstKey = feilmelding.concat('.tekst');
        const innhold = this.props.intl.formatMessage({ id: enonicFeilmeldingstekstKey }, ekstrafeilinfo);

        return (
            <div className="dokument-feilmelding feilmelding-container">
                <img src={url} alt=""/>

                <Feilmelding className="feilmelding panel panel-ramme">
                    <Undertittel tag="h1">
                        <FormattedMessage id={ feilmelding.concat('.tittel') }/>
                    </Undertittel>
                    <p dangerouslySetInnerHTML={ createMarkup(innhold) }/>
                </Feilmelding>
            </div>
        );
    }
}

DokumentFeilmelding.propTypes = {
    url: PropTypes.string.isRequired,
    ekstrafeilinfo: PropTypes.object.isRequired,
    feilmelding: PropTypes.string.isRequired,
    intl: intlShape
};

export default injectIntl(DokumentFeilmelding);
