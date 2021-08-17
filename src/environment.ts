declare global {
    interface Window {
        mininnboks?: {
            NAMESPACE: string;
            SF_DIALOG_URL: string;
        };
    }
}

export function getNAVBaseUrl(): string {
    const environment = window.mininnboks?.NAMESPACE;
    if (environment !== 'p') {
        return `https://www-${environment}.nav.no`;
    }
    return 'https://www.nav.no';
}

export function getSfUrl(): string {
    return window.mininnboks?.SF_DIALOG_URL || getNAVBaseUrl();
}