var React = require('react');
var jsdom = require('jsdom').jsdom;
var mount = require('enzyme').mount;
var IntlProvider = require('react-intl').IntlProvider;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom();
global.window = document.defaultView;
global.Image = window.Image;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);

        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

global.render = (component) => mount(<IntlProvider>{component}</IntlProvider>);