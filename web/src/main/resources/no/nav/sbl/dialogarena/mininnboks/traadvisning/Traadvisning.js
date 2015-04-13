var React = require('react/addons');
var BesvarBoks = require('./BesvarBoks');
var MeldingContainer = require('./MeldingContainer');
var Knapper = require('./Knapper');
var Snurrepipp = require('../snurrepipp/Snurrepipp');
var Feilmelding = require('../feilmelding/Feilmelding');
var InfoBoks = require('../infoboks/Infoboks');
var Epost = require('../epost/Epost');
var format = require('string-format');


var TraadVisning = React.createClass({
    getInitialState: function () {
        return {
            hentet: false,
            feilet: false,
            besvares: false,
            besvart: false,
            traad: {}
        };
    },
    componentDidMount: function () {
        if (this.props.valgtTraad) {
            okCallback.call(this, this.props.valgtTraad);
        } else if (typeof this.props.params.traadId === 'string' && this.props.params.traadId.length > 0) {
            $.get('/mininnboks/tjenester/traader/' + this.props.params.traadId)
                .then(okCallback.bind(this), feiletCallback.bind(this))
        } else {
            feiletCallback.call(this, this.props.valgtTraad);
        }
    },
    visBesvarBoks: function () {
        this.setState({besvares: true});
    },
    skjulBesvarBoks: function () {
        this.setState({besvares: false});
    },
    sendMelding: function (fritekst) {
        $.ajax({
            type: 'POST',
            url: '/mininnboks/tjenester/traader/svar',
            contentType: 'application/json',
            data: JSON.stringify({traadId: this.state.traad.nyeste.traadId, fritekst: fritekst})
        }).done(leggTilMelding.bind(this, fritekst));
    },
    getInfoMelding: function () {
        if (!this.state.traad.avsluttet) {
            return null;
        }
        return (
            <InfoBoks.Info>
                <p>
                        {this.props.resources.get('traadvisning.kan-ikke-svare.info')}
                        {' '}
                    <a href={this.props.resources.get('skriv.ny.link')}>{this.props.resources.get('traadvisning.kan-ikke-svare.lenke')}</a>
                </p>
            </InfoBoks.Info>);
    },
    render: function () {
        if (!this.state.hentet) {
            return <Snurrepipp />
        }
        if (this.state.feilet.status) {
            return <Feilmelding melding={this.state.feilet.melding} visIkon={true} />;
        }

        var meldingItems = this.state.traad.meldinger.map(function (melding) {
            return <MeldingContainer key={melding.id} melding={melding} resources={this.props.resources}/>
        }.bind(this));

        var overskrift = this.state.traad.nyeste.kassert ?
            this.props.resources.get('traadvisning.overskrift.kassert') :
            format(this.props.resources.get('traadvisning.overskrift'), this.state.traad.nyeste.temagruppeNavn);

        return (
            <div>
                <h1 className="diger">{overskrift}</h1>
                <div className="traad-container">
                    <Knapper kanBesvares={this.state.traad.kanBesvares} besvares={this.state.besvares} besvar={this.visBesvarBoks} resources={this.props.resources} />
                    {this.getInfoMelding()}
                    <BesvarBoks besvar={this.sendMelding} vis={this.state.besvares} skjul={this.skjulBesvarBoks} resources={this.props.resources} />
                    {this.state.besvart ? <InfoBoks.Ok>
                        <Epost resources={this.props.resources} />
                    </InfoBoks.Ok> : null }
                    {meldingItems}
                </div>
            </div>
        );
    }
});

function okCallback(data) {
    this.setState({
        traad: data,
        hentet: true
    });
    $.post('/mininnboks/tjenester/traader/lest/' + data.traadId);
}
function feiletCallback() {
    this.setState({
        feilet: {status: true, melding: this.props.resources.get('traadvisning.feilmelding.hentet-ikke-traad')},
        hentet: true
    })
}

function leggTilMelding(fritekst) {
    var meldinger = this.state.traad.meldinger.splice(0);
    meldinger.unshift({
        fritekst: fritekst,
        opprettet: new Date(),
        temagruppeNavn: this.state.traad.nyeste.temagruppeNavn,
        fraBruker: true,
        fraNav: false,
        statusTekst: 'Svar om ' + meldinger[0].temagruppeNavn
    });
    this.setState({
        traad: {meldinger: meldinger, kanBesvares: false, nyeste: meldinger[0]},
        besvart: true,
        besvares: false
    });
}
module.exports = TraadVisning;