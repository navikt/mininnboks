import 'babel-polyfill';

if (!global.Intl) {
    require('intl');
    require('intl/locale-data/jsonp/nb-NO.js');
}
