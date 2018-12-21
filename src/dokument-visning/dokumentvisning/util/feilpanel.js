import PropTypes from 'prop-types';
import React from 'react';
import Feilramme from './feilramme';

const Feilpanel = ({ tittel, tekst, ikonAria }) => (
    <Feilramme>
        <span className="vekk">{ ikonAria }</span>
        <h1 className="hode hode-undertittel hode-dekorert hode-advarsel">
            {tittel}
        </h1>
        <p>{tekst}</p>
    </Feilramme>
);

Feilpanel.propTypes = {
    tittel: PropTypes.string,
    ikonAria: PropTypes.element,
    tekst: PropTypes.element
};

export default Feilpanel;
