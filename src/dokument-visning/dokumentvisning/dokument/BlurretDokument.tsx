import * as React from 'react';

const BlurretDokument = ({ children } : {children : JSX.Element}) => (
    <div className="feilmelding-container">
        <img src="/img/Dummy_dokument.png" alt=""/>
        { children }
    </div>
);

export default BlurretDokument;
