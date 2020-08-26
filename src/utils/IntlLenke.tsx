import * as React from 'react';
import {ReactNode} from 'react';
import { injectIntl } from 'react-intl';

interface IntlLenkeProps {
    intl: object,
    href: string,
    children: ReactNode
}
function IntlLenke(props : IntlLenkeProps) {
    return (
        <a href={props.intl.formatMessage({ id: props.href })} {...props}>
            {props.children}
        </a>
    );
}

export default injectIntl(IntlLenke);
