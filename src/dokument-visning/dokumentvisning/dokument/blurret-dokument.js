import PropTypes from 'prop-types';
import React from 'react';

const BlurretDokument = ({ children }) => (
    <div className="feilmelding-container">
        <img src="/saksoversikt-api/img/dokumenter/Dummy_dokument.png" alt=""/>
        { children }
    </div>
);

BlurretDokument.propTypes = {
    children: PropTypes.element
};

export default BlurretDokument;
