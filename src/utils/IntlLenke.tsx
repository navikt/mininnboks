import * as React from 'react';
import {useIntl} from 'react-intl';

interface IntlLenkeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}
function IntlLenke(props : IntlLenkeProps) {
    const intl = useIntl();
    return (
        <a href={intl.formatMessage({ id: props.href })} {...props}>
            {props.children}
        </a>
    );
}

export default IntlLenke;
