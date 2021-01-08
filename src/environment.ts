declare global {
    interface Window {
        mininnboks: { namespace?: string };
    }
}

export function getNAVBaseUrl(): String {
    const environment = window.mininnboks.namespace;
    console.log(environment);
    if (environment !== 'p') {
        return `https://www-${environment}.nav.no`;
    }
    return 'https://www.nav.no';
}
