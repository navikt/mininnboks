import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { Hovedknapp  } from 'nav-frontend-knapper';

interface Props {
    onClick: () => void
}
function SkrivKnapp(props : Props) {
    return (
        <div className="text-center blokk-l">
            <Hovedknapp onClick={props.onClick} mini>
                <FormattedMessage id="traadvisning.skriv.svar.link" />
            </Hovedknapp>
        </div>
    );
}

export default visibleIfHOC(SkrivKnapp);
