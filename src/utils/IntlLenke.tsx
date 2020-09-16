import * as React from 'react';
import {ReactNode} from 'react';
import {InjectedIntl, injectIntl} from 'react-intl';

interface IntlLenkeProps {
    intl: InjectedIntl,
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
