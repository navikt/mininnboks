import * as React from 'react';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { Hovedknapp } from 'nav-frontend-knapper';

function SkrivKnapp(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="text-center blokk-l">
            <Hovedknapp onClick={props.onClick} mini>
                Skriv svar
            </Hovedknapp>
        </div>
    );
}

export default visibleIfHOC(SkrivKnapp);
