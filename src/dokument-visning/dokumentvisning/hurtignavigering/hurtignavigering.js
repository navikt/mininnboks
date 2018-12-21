import PT from 'prop-types';
import React from 'react';
import Navigeringsknapp from './navigeringsknapp';
import { lagOffset, zip, arr } from './../util/utils';

const tilKnapp = (kulemenypunkt, index) =>
    <Navigeringsknapp
      dokref={kulemenypunkt.dokumentreferanse}
      tittel={kulemenypunkt.tittel}
      key={kulemenypunkt.dokumentreferanse}
      offset={kulemenypunkt.offset}
    />;

const Hurtignavigering = ({ dokumentmetadata, navigeringsknappOffset }) => {
        if (dokumentmetadata.length < 2) {
            return <noscript/>;
        }
        const offset = lagOffset(dokumentmetadata.length, arr(navigeringsknappOffset));
        const knapper = zip(dokumentmetadata, offset, 'offset').map(tilKnapp);

        return <ul className="kulemeny">{ knapper }</ul>;
    };

Hurtignavigering.defaultProps = {
    navigeringsknappOffset: [-250, -80]
};

Hurtignavigering.propTypes = {
    dokumentmetadata: PT.array.isRequired,
    navigeringsknappOffset: PT.oneOfType([PT.number, PT.arrayOf(PT.number)])
};

export default Hurtignavigering;
