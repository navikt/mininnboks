import * as React from 'react';
import {InjectedIntl, injectIntl} from 'react-intl';

interface IntlLenkeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    intl: InjectedIntl;
    href: string;
}
function IntlLenke(props : IntlLenkeProps) {
    return (
        <a href={props.intl.formatMessage({ id: props.href })} {...props}>
            {props.children}
        </a>
    );
}

export default injectIntl(IntlLenke);
