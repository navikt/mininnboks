import * as React from 'react';
import Alertstripe from 'nav-frontend-alertstriper'

interface Props {
 children: JSX.Element | React.ReactNode;
 className?: string;
}
function Feilmelding(props: Props) {
    return <Alertstripe className={props.className} type="advarsel">{props.children}</Alertstripe>
}

export default Feilmelding;
