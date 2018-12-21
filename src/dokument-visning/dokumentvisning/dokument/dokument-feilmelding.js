import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

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
            <div className="feilmelding-container">
                <img src={url} alt=""/>

                <div className="feilmelding panel panel-ramme">
                    <p className="vekk"><FormattedMessage id="ikon.feilmelding.aria-label"/></p>
                    <h1 className="hode hode-undertittel hode-dekorert hode-advarsel">
                        <FormattedMessage id={ feilmelding.concat('.tittel') }/>
                    </h1>
                    <p dangerouslySetInnerHTML={ createMarkup(innhold) }/>
                </div>
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
