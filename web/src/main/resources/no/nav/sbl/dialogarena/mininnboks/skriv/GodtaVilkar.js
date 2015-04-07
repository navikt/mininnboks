var React = require('react/addons');
var ValidatableMixin = require('../feedback/ValidatableMixin');
var Resources = require('../resources/Resources');
var Betingelser = require('./Betingelser');

var GodtaVilkar = React.createClass({
    mixins: [ValidatableMixin],
    getInitialState: function () {
        return {checked: false};
    },
    onChange: function (event) {
        var checked = event.target.checked;
        this.setState({checked: checked});
        this.validate(checked);
    },
    onBlur: function () {
        this.validate();
    },
    validate: function (checked) {
        if (typeof checked === 'undefined') {
            checked = this.state.checked;
        }
        if (checked) {
            this.valid();
        } else {
            this.error(Resources.get('send-sporsmal.still-sporsmal.betingelser.feilmelding.ikke-akseptert'));
        }
    },
    visbetingelser: function (e) {
        this.refs.betingelserPanel.vis();
        e.preventDefault();
    },
    betingelseCallback: function (status) {
        this.refs.betingelserPanel.skjul();
        this.setState({
            checked: status
        });
    },
    render: function () {
        var errorMessages = this.getErrorMessages();
        var validationErrorClass = errorMessages.length === 0 ? '' : 'validation-error error';
        var inlineErrorMessage = this.props.showInline ? errorMessages.map(function (e) {
            return <p className="checkbox-feilmelding" role="alert" aria-live="assertive" aria-atomic="true">{e}</p>;
        }) : null;
        return (
            <div className="betingelsevalgpanel">
                <div className="checkbox">
                    <input type="checkbox" name="betingelseValg:betingelserCheckbox" id="betingelser"
                        onChange={this.onChange} onBlur={this.onBlur} checked={this.state.checked}/>
                    <label htmlFor="betingelser"
                        className={validationErrorClass}>
                        <span>{Resources.get("send-sporsmal.still-sporsmal.betingelser.sjekkboks")}</span>
                    </label>
                    <Betingelser ref="betingelserPanel" godta={this.betingelseCallback.bind(this, true)} avbryt={this.betingelseCallback.bind(this, false)}/>
                    <a href="#"
                        className="vilkarlenke" onClick={this.visbetingelser}>{Resources.get("send-sporsmal.still-sporsmal.betingelser.vis")}</a>
                    {inlineErrorMessage}
                </div>
            </div>
        );
    }
});

module.exports = GodtaVilkar;