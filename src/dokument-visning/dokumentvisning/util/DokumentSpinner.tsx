import * as React from 'react';

function DokumentSpinner(spin: boolean) {

    return spin ? <div className="spinner"></div> : null;
}

export default DokumentSpinner;
