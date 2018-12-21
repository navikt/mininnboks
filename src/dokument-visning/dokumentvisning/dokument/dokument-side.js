import PropTypes from 'prop-types';
import React from 'react';
import DokumentFeilmelding from './dokument-feilmelding';
import { injectIntl, FormattedMessage } from 'react-intl';
import ImageLoader from 'react-imageloader';
import Spinner from '../util/spinner';
import BlurretDokument from './blurret-dokument';
import Alertstripe from 'nav-frontend-alertstriper'

import "./dokument-side.less"

const renderPreloader = () => (
    <BlurretDokument>
        <Spinner spin/>
    </BlurretDokument>
);

const renderFeilkomponent = (openPdfUrl) =>
    <BlurretDokument>
        <Alertstripe type="advarsel" className="feilmelding">
            <FormattedMessage id="dokumentvisning.bildelasting.feilet"/>
            <span>&nbsp;</span>
            <a href={openPdfUrl}><FormattedMessage id="dokumentvisning.bildelasting.feilet.lenketekst"/></a>
        </Alertstripe>
    </BlurretDokument>;

function loaderWrapper(props, children) {
    return <div {...props} >{children}</div>;
}

const robustImg = (src, imgProps, feilkomponent) => (
    <ImageLoader
        src={src}
        className="dokument-laster"
        wrapper={loaderWrapper}
        imgProps={imgProps}
        preloader={renderPreloader}
    >
        { feilkomponent }
    </ImageLoader>
);

const DokumentSide = ({ url, openPdfUrl, kanVises, tittel, side, feilmelding, ekstrafeilinfo, intl: { formatMessage } }) => {
    const bildetekst = formatMessage({ id: 'dokumentinnsyn.side.alttekst' }, { sidetall: side, tittel });
    return kanVises ?
        robustImg(url, { alt: bildetekst, tabIndex: '0' }, renderFeilkomponent(openPdfUrl)) :
        <DokumentFeilmelding url={url} feilmelding={feilmelding} ekstrafeilinfo={ekstrafeilinfo}/>;
};

DokumentSide.propTypes = {
    url: PropTypes.string.isRequired,
    openPdfUrl: PropTypes.string.isRequired,
    kanVises: PropTypes.bool.isRequired,
    ekstrafeilinfo: PropTypes.object,
    feilmelding: PropTypes.string
};

export default injectIntl(DokumentSide);
