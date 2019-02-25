import PropTypes from 'prop-types';
import React from 'react';

const Feilramme = ({ children }) => (
    <div className="feilmelding panel panel-ramme">
        { children }
    </div>
);

Feilramme.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
};

export default Feilramme;
