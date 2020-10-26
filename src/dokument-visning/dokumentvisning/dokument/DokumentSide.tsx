import * as React from 'react';
import DokumentFeilmelding from './DokumentFeilmelding';
import { FormattedMessage, useIntl } from 'react-intl';

// @ts-ignore
import ImageLoader from 'react-imageloader';
import BlurretDokument from './BlurretDokument';
import Alertstripe from 'nav-frontend-alertstriper';
import './dokument-side.less';
import DokumentSpinner from '../util/DokumentSpinner';

interface Props {
    url: string;
    openPdfUrl: string;
    kanVises: boolean;
    ekstrafeilinfo: { [key: string]: string };
    feilmelding: string;
    side: number;
    tittel: string;
}

const renderPreloader = () => (
    <BlurretDokument>
        <DokumentSpinner spin />
    </BlurretDokument>
);

const renderFeilkomponent = (openPdfUrl: string) => (
    <BlurretDokument>
        <Alertstripe type="advarsel" className="feilmelding">
            <FormattedMessage id="dokumentvisning.bildelasting.feilet" />
            <span>&nbsp;</span>
            <a href={openPdfUrl}>
                <FormattedMessage id="dokumentvisning.bildelasting.feilet.lenketekst" />
            </a>
        </Alertstripe>
    </BlurretDokument>
);

function loaderWrapper({ props, children }: { props: any; children: React.ReactNode }) {
    return <div {...props}>{children}</div>;
}
interface ImgProps {
    alt: string;
    tabIndex: string;
}
const robustImg = (src: string, imgProps: ImgProps, feilkomponent: React.ReactNode) => (
    <ImageLoader
        src={src}
        className="dokument-laster"
        wrapper={loaderWrapper}
        imgProps={imgProps}
        preloader={renderPreloader}
    >
        {feilkomponent}
    </ImageLoader>
);
function DokumentSide(props: Props) {
    const intl = useIntl();
    const tittel = props.tittel;
    const bildetekst = intl.formatMessage({ id: 'dokumentinnsyn.side.alttekst' }, { sidetall: props.side, tittel });
    return props.kanVises ? (
        robustImg(props.url, { alt: bildetekst, tabIndex: '0' }, renderFeilkomponent(props.openPdfUrl))
    ) : (
        <DokumentFeilmelding url={props.url} feilmelding={props.feilmelding} ekstrafeilinfo={props.ekstrafeilinfo} />
    );
}

export default DokumentSide;
