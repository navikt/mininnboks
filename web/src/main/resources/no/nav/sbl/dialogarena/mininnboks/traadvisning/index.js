var React = require('react');
var BesvarBoks = require('./BesvarBoks');
var MeldingContainer = require('./MeldingContainer');
var Knapper = require('./Knapper');
var resources = require('resources');
var Snurrepipp = require('snurrepipp');
var Feilmelding = require('feilmelding');
var format = require('string-format');

var TraadVisning = React.createClass({
    getInitialState: function () {
        return {
            hentet: false,
            feilet: false,
            besvares: false,
            traad: {}
        };
    },
    componentDidMount: function () {
        var traaderPromise = $.get('/mininnboks/tjenester/traader/' + this.props.id);
        $.when(traaderPromise, resources.promise).then(okCallback.bind(this), feiletCallback.bind(this));
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
            url: '/mininnboks/tjenester/traader/ny',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({traadId: this.state.traad.nyeste.traadId, fritekst: fritekst})
        }).done(leggTilMelding.bind(this));
    },
    render: function () {
        if (!this.state.hentet) {
            return <Snurrepipp />
        }
        if (this.state.feilet.status) {
            return (
                <div className="innboks-container">
                    <Feilmelding melding={this.state.feilet.melding} />
                </div>
            );
        }

        var meldingItems = this.state.traad.meldinger.map(function (melding) {
            return <MeldingContainer melding={melding} />
        });
        var overskrift = this.state.traad.nyeste.kassert ?
            resources.get('traadvisning.overskrift.kassert') :
            format(resources.get('traadvisning.overskrift'), this.state.traad.nyeste.temagruppeNavn);

        return (
            <div>
                <h1 className="diger">{overskrift}</h1>
                <div className="innboks-container traad-container">
                    <Knapper avsluttet={this.state.traad.avsluttet} kanBesvares={this.state.traad.kanBesvares} besvares={this.state.besvares} besvar={this.visBesvarBoks} />
                    <BesvarBoks besvar={this.sendMelding} vis={this.state.besvares} skjul={this.skjulBesvarBoks} />
                    {meldingItems}
                </div>
            </div>
        );
    }
});

function okCallback(data) {
    if (data[1] === "success") {
        this.setState({
            traad: data[0],
            hentet: true
        });
    } else {
        console.error('okCallback:: Kunne ikke hente ut tråd', data);
        this.setState({
            feilet: {status: true, melding: 'Kunne ikke hente ut tråd.'},
            hentet: true
        })
    }
}
function feiletCallback(data) {
    console.error('feiletCallback:: Kunne ikke hente ut tråd', data);
    this.setState({
        feilet: {status: true, melding: 'Kunne ikke hente ut tråd.'},
        hentet: true
    })
}

function leggTilMelding() {
    var meldinger = this.state.meldinger.splice(0);
    meldinger.unshift({
        fritekst: fritekst,
        opprettet: new Date(),
        fraBruker: true,
        fraNav: false,
        statusTekst: 'Svar om ' + meldinger[0].temagruppeNavn
    });
    this.setState({
        traad: {meldinger: meldinger, kanBesvares: false, nyeste: meldinger[0]},
        besvares: false
    });
}
module.exports = TraadVisning;