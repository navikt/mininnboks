import 'babel-polyfill';
import 'whatwg-fetch';

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
        console[prop] = empty;
    });
    methods.forEach((method) => {
        console[method] = dummy;
    });

    (window as any).console = console; // tslint:disable-line no-any
})(window.console));