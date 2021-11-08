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
    const httpErrorHandler = props.httpErrorHandler;
    const [error, setError] = useState('');
    const onError = useCallback(
        (statusCode: number) => setError(httpErrorHandler(statusCode)),
        [setError, httpErrorHandler]
    );

    return (
        <ObjectHttpErrorHandler
            type="application/pdf"
            url={url}
            width="100%"
            height={75 * 16}
            onError={onError}
        >
            <div className="error">
                <AlertStripeAdvarsel>{error}</AlertStripeAdvarsel>
            </div>
        </ObjectHttpErrorHandler>
    );
}

export default PdfViewer;