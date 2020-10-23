import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'whatwg-fetch';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/nb';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/nb';

if (!global.Intl) {
    require('intl');
    require('intl/locale-data/jsonp/nb-NO.js');
}

// Vår egen polyfill for console
((function consolepolyfill(con?: Console) {
    if (con) {
        return;
    }
    const console: Console = {} as Console;
    const empty = {};
    const dummy = () => {}; // tslint:disable-line no-empty
    const properties = 'memory'.split(',');
    const methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
        'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
        'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    properties.forEach((prop) => {
        // @ts-ignore
        console[prop] = empty;
    });
    methods.forEach((method) => {
        // @ts-ignore
        console[method] = dummy;
    });

    (window as any).console = console; // tslint:disable-line no-any
})(window.console));
