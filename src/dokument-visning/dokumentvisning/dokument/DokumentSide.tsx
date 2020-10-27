import * as React from 'react';
import DokumentFeilmelding from './DokumentFeilmelding';
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
            Det skjedde en feil under lasting av denne siden. Prøv heller å laste ned som
            <span>&nbsp;</span>
            <a href={openPdfUrl}>PDF</a>
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
    const bildetekst = `Side ${props.side} i ${props.tittel}`;
    return props.kanVises ? (
        robustImg(props.url, { alt: bildetekst, tabIndex: '0' }, renderFeilkomponent(props.openPdfUrl))
    ) : (
        <DokumentFeilmelding url={props.url} feilmelding={props.feilmelding} ekstrafeilinfo={props.ekstrafeilinfo} />
    );
}

export default DokumentSide;
