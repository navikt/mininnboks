import PropTypes from 'prop-types';
import React from 'react';

const scrollToTop = (e) => {
    e.preventDefault();
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // Firefox and IE
};

const DokumentHeader = ({ tabbable, scrollToTopOnFocus, children }) => {
    const dokumentHeaderProps = {
        className: 'dokumentheader blokk-xxxs'
    };

    if (tabbable) {
        dokumentHeaderProps.tabIndex = '0';
    }

    if (scrollToTopOnFocus) {
        dokumentHeaderProps.onFocus = scrollToTop;
    }

    return (
        <div { ...dokumentHeaderProps }>
            {children}
        </div>
    );
};


DokumentHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array
    ]).isRequired,
    scrollToTopOnFocus: PropTypes.bool,
    tabbable: PropTypes.bool
};

export default DokumentHeader;
