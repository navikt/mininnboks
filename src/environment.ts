declare global {
    interface Window { mininnboks: { namespace?: string; }; }
}

export function isProd() : Boolean {
    const environment = window.mininnboks.namespace;
    return environment === 'p'
}
