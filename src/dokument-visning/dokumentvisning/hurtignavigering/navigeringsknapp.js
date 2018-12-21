import PT from 'prop-types';
import React from 'react';
// import { Button } from 'react-scroll';

//
// <Button
//     activeClass="active"
//     to={dokref}
//     spy smooth
//     duration={500}
//     offset={offset}
//     title={tittel}
//     type="button"
// />

const Navigeringsknapp = ({ dokref, tittel, offset}) => {
    return (
        <li>
            <div>TODO</div>
        </li>
    );
};

Navigeringsknapp.propTypes = {
    dokref: PT.string.isRequired,
    tittel: PT.string.isRequired,
    offset: PT.number
};

export default Navigeringsknapp;
