import PT from 'prop-types';
import React from 'react';
import {validate} from '../utils/validationutil';
import {STATUS} from './../ducks/utils';
import {FormattedMessage} from 'react-intl';
import {TextareaControlled} from 'nav-frontend-skjema';
import {Hovedknapp, Flatknapp} from 'nav-frontend-knapper';
import {visibleIfHOC} from "../utils/hocs/visible-if";
import Feilmelding from "../feilmelding/feilmelding";

class BesvarBoks extends React.Component {

    onSubmit(e) {
        e.preventDefault();

        const {traadId, submit} = this.props;
        const fritekst = e.target.elements.fritekst.value;
        const errors = validate( {
            fritekst: fritekst
        });
        const errorIds = Object.entries(errors).map(([field, errorType]) => `feilmelding.${field}.${errorType}`);
        this.setState({
            errorIds: errorIds
        });

        if (!errorIds.length) {
            submit(traadId, fritekst);
        }
    };

    render() {
        const {avbryt, innsendingStatus} = this.props;
        const state = this.state;
        const errorIds = state && state.errorIds;
        const feilmeldinger = errorIds && errorIds.map(errorId => (
            <Feilmelding className="blokk-m">
                <FormattedMessage id={errorId}/>
            </Feilmelding>
        ));

        return (
            <form className="besvar-container text-center blokk-center blokk-l" onSubmit={this.onSubmit.bind(this)}>
                <TextareaControlled name="fritekst"/>
                {feilmeldinger}
                <div className="blokk-xs">
                    <Hovedknapp type="submit" spinner={innsendingStatus === STATUS.PENDING}>
                        <FormattedMessage id="traadvisning.besvar.send"/>
                    </Hovedknapp>
                </div>
                <Flatknapp onClick={avbryt}>
                    <FormattedMessage id="traadvisning.besvar.avbryt"/>
                </Flatknapp>
            </form>
        );
    }
}


BesvarBoks.propTypes = {
    innsendingStatus: PT.string.isRequired,
    traadId: PT.string.isRequired,
    submit: PT.func.isRequired,
    resetForm: PT.func.isRequired,
    avbryt: PT.func.isRequired,
    fields: PT.object.isRequired,
    handleSubmit: PT.func.isRequired
};

export default visibleIfHOC(BesvarBoks);