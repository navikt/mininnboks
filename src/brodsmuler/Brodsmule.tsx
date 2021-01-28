import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    tekst: string | JSX.Element;
    path: string;
}

function Brodsmule(props: Props) {
    const lenke = props.path.startsWith('/') ? (
        <Link to={props.path} className="lenke">
            {props.tekst}
        </Link>
    ) : (
        <a href={props.path} className="lenke">
            {props.tekst}
        </a>
    );
    return <li className="brodsmuler__item typo-normal">{lenke}</li>;
}

Brodsmule.defaultProps = {
    skalVises: true,
    path: undefined
};

export default Brodsmule;
