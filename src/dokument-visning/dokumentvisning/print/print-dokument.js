import pt from 'prop-types';
import React from 'react';

export class Print extends React.Component {
    componentDidMount() {
        document.body.classList.add('innsynside');
        document.getElementsByClassName('container maincontent')[0].style.margin = 0;
        document.getElementsByClassName('container maincontent')[0].style.padding = 0;
        window.frames.pdfiframe.print();
    }

    componentWillUnmount() {
        document.body.removeAttribute('class');
    }

    render() {
        const height = window.innerHeight;
        const width = window.innerWidth;

        return (
            <iframe src={this.props.documentUrl} id="pdfiframe" name="pdfiframe" height={height} width={width}></iframe>
        );
    }
}

Print.PropTypes = {
    documentUrl: pt.string.isRequired
};

export const createDokumentUrl = (baseUrl, journalpostid, dokref) =>
    `${baseUrl}/tjenester/dokumenter/dokument/${journalpostid}/${dokref}`;
