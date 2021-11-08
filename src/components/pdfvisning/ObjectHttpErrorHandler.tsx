import * as React from 'react';
import { useState, useEffect } from 'react';
import Spinner from "../../utils/Spinner";

interface Props
    extends Omit<React.DetailedHTMLProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, 'onError'> {
    url: string;
    children: React.ReactNode;
    onError: ErrorHandler;
}
export type ErrorHandler = (statusCode: number) => void;

interface BlobData {
    hasError: boolean;
    blobUrl: string | null;
}
function useBlobLoader(url: string, onError: ErrorHandler): BlobData {
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [hasError, setError] = useState(false);

    useEffect(() => {
        let objectUrl = '';
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    setError(true);
                    onError(res.status);
                } else {
                    setError(false);
                }
                return res.blob();
            })
            .then(blob => {
                objectUrl = URL.createObjectURL(blob);
                setBlobUrl(objectUrl);
            });

        return () => {
            window.URL.revokeObjectURL(objectUrl);
        };
    }, [url, setBlobUrl, onError, setError]);


    return { hasError, blobUrl };
}

function ObjectHttpErrorHandler(props: Props) {
    const { url, onError, children, ...rest } = props;
    const blobdata = useBlobLoader(url, onError);
    if (blobdata.blobUrl === null) {
        return <Spinner />;
    } else if (blobdata.hasError) {
        return <>{children}</>;
    } else {
        return <object data={blobdata.blobUrl} children={children} {...rest} />;
    }
}

export default ObjectHttpErrorHandler