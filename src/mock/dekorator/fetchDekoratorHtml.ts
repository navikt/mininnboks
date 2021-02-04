import { DekoratorParams, getDekoratorUrl } from './getDekoratorUrl';

export interface DekoratorHtmlElements {
    styles: Array<Element>;
    scripts: Array<Element>;
    header: Array<Element>;
    footer: Array<Element>;
}

function markScriptAsSafe(element: Element): Element {
    // This is needed because script-tags inserted using innerHTML do not execute, as per the HTML5-spec.
    if (element.tagName === 'SCRIPT') {
        const replacement = document.createElement('script');
        replacement.src = (element as any).src;
        replacement.async = (element as any).async;
        replacement.defer = (element as any).defer;
        replacement.type = (element as any).type;
        return replacement;
    }
    return element;
}

function convertToNative(element: HTMLElement | null): Array<Element> {
    if (element === null) {
        return [];
    }
    return Array.from(element.children).map(markScriptAsSafe);
}

export default async function fetchDekoratorHtml(params?: DekoratorParams): Promise<DekoratorHtmlElements> {
    const url = getDekoratorUrl(params);
    const res = await fetch(url);
    const body = await res.text();

    const container = window.document.createElement('div');
    container.innerHTML = body;

    const styles = convertToNative(container.querySelector('#styles'));
    const scripts = convertToNative(container.querySelector('#scripts'));
    const header = convertToNative(container.querySelector('#header-withmenu'));
    const footer = convertToNative(container.querySelector('#footer-withmenu'));

    if (!styles || !scripts || !header || !footer) {
        throw new Error(body);
    }

    return { styles, scripts, header, footer };
}
