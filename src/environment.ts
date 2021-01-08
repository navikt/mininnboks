declare global {
    interface Window {
        mininnboks: { namespace?: string };
    }
}

export function isProd(): Boolean {
    const environment = window.mininnboks.namespace;
    return environment === 'p';
}

export function getNAVBaseUrl(): String {
    const environment = window.mininnboks.namespace;
    if (environment === 'p') {
        return 'https://www.nav.no';
    }
    return `https://www-${environment}.nav.no`;
}
