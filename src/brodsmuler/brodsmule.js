import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';

function Brodsmule(props) {
    const path = props.path;
    const lenke = path.startsWith("/")
        ? <Link to={path} className="lenke">
            {props.tekst}
        </Link>
        : <a href={path} className="lenke">
            {props.tekst}
        </a>
    ;

    return (
        <li className="brodsmuler__item typo-normal">
            {lenke}
        </li>
    );
}

Brodsmule.propTypes = {
    tekst: PT.string.isRequired,
    path: PT.string.isRequired,
};

Brodsmule.defaultProps = {
    skalVises: true,
    path: undefined,
};

export default Brodsmule;
