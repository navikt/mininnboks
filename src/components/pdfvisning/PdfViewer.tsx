import * as React from 'react';
import {useCallback, useState} from 'react';
import {AlertStripeAdvarsel} from "nav-frontend-alertstriper";
import {getMockableUrl} from "./mockable-pdf-url";
import ObjectHttpErrorHandler from "./ObjectHttpErrorHandler";

interface Props {
    url: string;
    httpErrorHandler: (statusCode: number) => string;
}

function PdfViewer(props: Props) {
    const url = getMockableUrl(props.url)
    const [error, setError] = useState('');
    const onError = useCallback(
        (statusCode: number) => setError(props.httpErrorHandler(statusCode)),
        [setError, props.httpErrorHandler]
    );

    return (
        <ObjectHttpErrorHandler
            type="application/pdf"
            url={url}
            width="100%"
            height="100%"
            onError={onError}
        >
            <div className="error">
                <AlertStripeAdvarsel>{error}</AlertStripeAdvarsel>
            </div>
        </ObjectHttpErrorHandler>
    );
}

export default PdfViewer;