import * as React from 'react';
import Alertstripe from 'nav-frontend-alertstriper'

interface Props {
 children: JSX.Element;
}
function Feilmelding(props: Props) {
    return <Alertstripe type="advarsel">{props.children}</Alertstripe>
}

export default Feilmelding;
