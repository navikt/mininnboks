import React from 'react';
import TraaderContainer from './TraaderContainer';
import Snurrepipp from '../snurrepipp/Snurrepipp';
import Feilmelding from '../feilmelding/Feilmelding';
import { Link } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import Breadcrumbs from '../utils/brodsmulesti/customBreadcrumbs';

function okCallback(data) {
    this.setState({
        traader: data,
        hentet: true
    });
}
function feiletCallback() {
    this.setState({
        feilet: { status: true, melding: this.props.intl.formatMessage({ id: 'innboks.kunne-ikke-hente-meldinger' }) },
        hentet: true
    });
}

class ListeVisning extends React.Component {
    constructor(props) {
        super(props);
        this.state = { traader: [], hentet: false, feilet: { status: false } };
    }

    componentDidMount() {
        $.get('/mininnboks/tjenester/traader/').then(okCallback.bind(this), feiletCallback.bind(this));
    }

    render() {
        if (!this.state.hentet) {
            return <Snurrepipp />;
        }

        const { setValgtTraad, routes, params, intl: { formatMessage } } = this.props;

        let content;
        if (this.state.feilet.status) {
            content = <Feilmelding melding={this.state.feilet.melding} />;
        } else if (this.state.traader.length === 0) {
            content = <Feilmelding melding={formatMessage({ id: 'innboks.tom-innboks-melding' })}/>;
        } else {
            content = <TraaderContainer traader={this.state.traader} setValgtTraad={setValgtTraad} formatMessage={formatMessage} location={this.props.location}/>;
        }

        return (
            <div>
                <Breadcrumbs routes={routes} params={params} formatMessage={formatMessage} />
                <h1 className="typo-sidetittel text-center blokk-l">{formatMessage({ id: 'innboks.overskrift' })}</h1>
                <div className="innboks-navigasjon clearfix">
                     <Link to={formatMessage({ id: 'skriv.ny.link' })} className="knapp knapp-hoved knapp-liten" >
                         {formatMessage({ id: 'innboks.skriv.ny.link' })}
                     </Link>
                </div>
                {content}
            </div>
        );
    }
}

ListeVisning.propTypes = {
    intl: intlShape
};

export default injectIntl(ListeVisning);
