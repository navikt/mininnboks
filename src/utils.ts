import { Melding, Traad } from './Traad';
import * as React from 'react';

export function nyesteTraadForst(traad1: Traad, traad2: Traad) {
    const d1 = new Date(traad1.nyeste.opprettet);
    const d2 = new Date(traad2.nyeste.opprettet);

    if (d1 < d2) return 1;
    else if (d1 > d2) return -1;
    return 0;
}

export function eldsteMeldingForst(melding1: Melding, melding2: Melding) {
    const d1 = new Date(melding1.opprettet);
    const d2 = new Date(melding2.opprettet);

    if (d1 > d2) {
        return 1;
    } else if (d1 < d2) {
        return -1;
    }
    return 0;
}

export const fn = (value: unknown) => (typeof value === 'function' ? value : () => value);
export const getDisplayName = <T>(component: React.ComponentType<T>) =>
    component.displayName || component.name || 'Component';

interface FrontendLogger {
    info(message: string | object): void;
    warn(message: string | object): void;
    error(message: string | object): void;
    event(message: string | object): void;
}

const mockLogger: FrontendLogger = {
    info: function () {},
    warn: function () {},
    error: function () {},
    event: function () {}
};
export function getLogger(): FrontendLogger {
    return (window as any)['frontendlogger'] || mockLogger;
}
