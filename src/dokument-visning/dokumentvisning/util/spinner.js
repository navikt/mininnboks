import PropTypes from 'prop-types';
import React from 'react';

const Spinner =
    props => props.spin ? <div className="spinner"></div> : null;

Spinner.propTypes = { spin: PropTypes.bool };

export default Spinner;
