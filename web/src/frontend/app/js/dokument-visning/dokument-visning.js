import React, { PropTypes as PT } from 'react';
import { Dokumenter, Hurtignavigering } from 'react-dokumentvisning';

const offset = [-300, -80];

class DokumentVisning extends React.Component {
    componentDidMount() {
        document.body.scrollTop = 1;
        document.documentElement.scrollTop = 1;
    }

    render() {
        const { dokumentmetadata, journalpostmetadata } = this.props;

        return (
            <section className="dokumenter">
                <Hurtignavigering dokumentmetadata={dokumentmetadata} navigeringsknappOffset={offset} />
                <Dokumenter
                    journalpostId={journalpostmetadata.journalpostId}
                    dokumentmetadata={dokumentmetadata}
                />
            </section>
        );
    }
}

DokumentVisning.propTypes = {
    dokumentmetadata: PT.array.isRequired,
    journalpostmetadata: PT.object.isRequired
};

export default DokumentVisning;
