import PropTypes from 'prop-types';
import React from 'react';
import DokumentFeilmelding from './dokument-feilmelding';
import { injectIntl, FormattedMessage } from 'react-intl';
import ImageLoader from 'react-imageloader';
import Spinner from '../util/spinner';
import BlurretDokument from './blurret-dokument';
import Feilpanel from '../util/feilpanel';
import Feilramme from '../util/feilramme';

const renderPreloader = () => (
    <BlurretDokument>
        <Feilramme>
            <Spinner spin/>
        </Feilramme>
    </BlurretDokument>
);

const renderFeilkomponent = (openPdfUrl) =>
    <BlurretDokument>
        <Feilpanel tekst={(
            <span>
                <FormattedMessage id="dokumentvisning.bildelasting.feilet"/>
                <a href={openPdfUrl}><FormattedMessage id="dokumentvisning.bildelasting.feilet.lenketekst"/></a>
            </span>
            )} ikonAria={<FormattedMessage id="ikon.feilmelding.aria-label"/>}
        />
    </BlurretDokument>;

const robustImg = (src, imgProps, feilkomponent) => (
    <ImageLoader
        src={src}
        className="dokument-laster"
        wrapper={(props) => <div {...props} />}
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
