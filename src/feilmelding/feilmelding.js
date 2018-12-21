import PT from 'prop-types';
import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper'

function Feilmelding(props) {
    return <Alertstripe type="advarsel" {...props} />
}

Feilmelding.propTypes = {
    tittel: PT.oneOfType([PT.string, PT.node]).isRequired,
    children: PT.node
};

export default Feilmelding;
