import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'whatwg-fetch';

if (!global.Intl) {
    require('intl');
    require('intl/locale-data/jsonp/nb-NO.js');
}

// Vår egen polyfill for console
(function consolepolyfill(con?: Console) {
    if (con) {
        return;
    }
    const console: Console = {} as Console;
    const empty = {};
    const dummy = () => {}; // tslint:disable-line no-empty
    const properties = 'memory'.split(',');
    const methods = (
        'assert,clear,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
        'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn'
    ).split(',');
    properties.forEach((prop) => {
        // @ts-ignore
        console[prop] = empty;
    });
    methods.forEach((method) => {
        // @ts-ignore
        console[method] = dummy;
    });

    (window as any).console = console; // tslint:disable-line no-any
})(window.console);

function at(n: number) {
    n = Math.trunc(n) || 0;
    // @ts-ignore
    if (n < 0) {
        // @ts-ignore
        n += this.length;
    }
    // @ts-ignore
    if (n < 0 || n >= this.length) return undefined;
    // @ts-ignore
    return this[n];
}
const prototypeValue: PropertyDescriptor = {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true
};
// eslint-disable-next-line
Object.defineProperty(Array.prototype, 'at', prototypeValue);
// eslint-disable-next-line
Object.defineProperty(String.prototype, 'at', prototypeValue);

export {};
declare global {
    interface Array<T> {
        at(n: number): T | undefined;
    }
    interface String {
        at(n: number): String | undefined;
    }
}
