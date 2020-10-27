import * as React from 'react';
import { useIntl } from 'react-intl';

interface IntlLenkeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

function IntlLenke(props: IntlLenkeProps) {
    const intl = useIntl();
    const { href, ...rest } = props;
    return (
        <a href={intl.formatMessage({ id: href })} {...rest}>
            {props.children}
        </a>
    );
}

export default IntlLenke;
