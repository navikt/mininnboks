import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Props } from 'react-intl/lib/src/components/message';
function FormattedHTMLMessage<V extends Record<string, any>>(props: Props<V>) {
    return (
        <FormattedMessage {...props}>
            {(result: string) => <div dangerouslySetInnerHTML={{ __html: result }}></div>}
        </FormattedMessage>
    );
}
export default FormattedHTMLMessage;
