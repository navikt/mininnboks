import moment from 'moment';
import {Melding, Traad} from "./Traad";
import * as React from "react";
import {Context} from "react";

export const prettyDate = (date: string) => moment(date).format('Do MMMM YYYY, [kl.] HH:mm');

export const shortDate = (date: string) => moment(date).format('DD.MM.YY');

export function nyesteTraadForst(traad1 : Traad, traad2 : Traad) {
    const d1 = new Date(traad1.nyeste.opprettet);
    const d2 = new Date(traad2.nyeste.opprettet);

    if (d1 < d2) return 1;
    else if (d1 > d2) return -1;
    return 0;
}

export function eldsteMeldingForst(melding1 : Melding, melding2 : Melding) {
    const d1 = new Date(melding1.opprettet);
    const d2 = new Date(melding2.opprettet);

    if (d1 > d2) {
        return 1;
    } else if (d1 < d2) {
        return -1;
    }
    return 0;
}

export function autobind(ctx : Context<unknown>) {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter((prop) => typeof ctx[prop] === 'function')
        .forEach((method) => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
}

export function debounce(func : () => {}, wait, immediate) {
    let timeout: number | undefined;
    return function debounced(...args) {
        const context = this;
        const later = () => {
            timeout = undefined;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

export const fn = (value : unknown) => (typeof value === 'function' ? value : () => value);
export const getDisplayName = (component : React.ComponentType) => component.displayName || component.name || 'Component';

export function throttle(func: () => {}, threshold = 250) {
    let last: number | undefined;
    let deferTimer: number | undefined;

    return function throttled(...args) {
        const context = this;

        const now = +new Date();
        if (last && now < last + threshold) {
            clearTimeout(deferTimer);
            deferTimer = window.setTimeout(() => {
                last = now;
                func.apply(context, args);
            }, threshold);
        } else {
            last = now;
            func.apply(context, args);
        }
    };
}

export function erDev() {
    const url = window.location.href;
    return url.includes('debug=true') || url.includes('devillo.no:8586') || url.includes('localhost:8586');
}

const mockLogger = { info: function(){}, warn: function(){}, error: function(){}, event: function(){}};
export function getLogger() {
    return window['frontendlogger'] || mockLogger;
}


