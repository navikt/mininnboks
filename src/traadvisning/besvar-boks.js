import PT from 'prop-types';
import React from 'react';
import {validate} from '../utils/validationutil';
import {STATUS} from './../ducks/utils';
import {FormattedMessage} from 'react-intl';
import {TextareaControlled} from 'nav-frontend-skjema';
import {Hovedknapp, Flatknapp} from 'nav-frontend-knapper';
import {visibleIfHOC} from "../utils/hocs/visible-if";
import Feilmelding from "../feilmelding/feilmelding";

import './besvar-boks.less'

class BesvarBoks extends React.Component {

    onSubmit(e) {
        e.preventDefault();

        const {traadId, submit} = this.props;
        const fritekst = e.target.elements.fritekst.value;
        const errors = validate({
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
            <form className="besvar-boks text-center blokk-center blokk-l" onSubmit={this.onSubmit.bind(this)}>
                <TextareaControlled
                    textareaClass="fritekst"
                    name="fritekst"
                    label={""}
                    maxLength={1000}
                />
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
    avbryt: PT.func.isRequired,
};

export default visibleIfHOC(BesvarBoks);