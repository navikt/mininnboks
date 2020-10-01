import * as React from 'react';
import DokumentFeilmelding from './dokument-feilmelding';
import { injectIntl, FormattedMessage } from 'react-intl';
import ImageLoader from 'react-imageloader';
import BlurretDokument from './BlurretDokument';
import Alertstripe from 'nav-frontend-alertstriper'
import "./dokument-side.less"
import DokumentSpinner from "../util/DokumentSpinner";

interface Props {
    url: string;
    openPdfUrl: string;
    kanVises: boolean;
    ekstrafeilinfo: any;
    feilmelding: string;
}

const renderPreloader = () => (
    <BlurretDokument>
        <DokumentSpinner spin/>
    </BlurretDokument>
);

const renderFeilkomponent = (openPdfUrl : string) =>
    <BlurretDokument>
        <Alertstripe type="advarsel" className="feilmelding">
            <FormattedMessage id="dokumentvisning.bildelasting.feilet"/>
            <span>&nbsp;</span>
            <a href={openPdfUrl}><FormattedMessage id="dokumentvisning.bildelasting.feilet.lenketekst"/></a>
        </Alertstripe>
    </BlurretDokument>;

function loaderWrapper({props, children} : {props: any, children : React.ReactNode}) {
    return <div {...props} >{children}</div>;
}
interface ImgProps {
    alt: string;
    tabIndex: string
}
const robustImg = (src : string, imgProps : ImgProps, feilkomponent : React.ReactNode) => (
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
function DokumentSide ({props, side, tittel, formatMessage} : {props: Props, side: any, tittel: string, formatMessage: any }){
    const bildetekst = formatMessage({ id: 'dokumentinnsyn.side.alttekst' }, { sidetall: side, tittel });
    return props.kanVises ?
        robustImg(props.url, { alt: bildetekst, tabIndex: '0' }, renderFeilkomponent(props.openPdfUrl)) :
        <DokumentFeilmelding url={props.url} feilmelding={props.feilmelding} ekstrafeilinfo={props.ekstrafeilinfo}/>;
};

export default injectIntl(DokumentSide);
