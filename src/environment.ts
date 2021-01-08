declare global {
    interface Window {
        mininnboks: { NAMESPACE?: string };
    }
}

export function getNAVBaseUrl(): String {
    const environment = window.mininnboks.NAMESPACE;
    if (environment !== 'p') {
        return `https://www-${environment}.nav.no`;
    }
    return 'https://www.nav.no';
}
