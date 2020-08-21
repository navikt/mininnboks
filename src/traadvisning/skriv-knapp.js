import PT from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { Hovedknapp  } from 'nav-frontend-knapper';

function SkrivKnapp({ onClick }) {
    return (
        <div className="text-center blokk-l">
            <Hovedknapp onClick={onClick} storrelse="liten">
                <FormattedMessage id="traadvisning.skriv.svar.link" />
            </Hovedknapp>
        </div>
    );
}

SkrivKnapp.propTypes = {
    onClick: PT.func.isRequired
};

export default visibleIfHOC(SkrivKnapp);
