import * as React from 'react';
import { FieldState } from '@nutgaard/use-formstate';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export function feilmelding(field: FieldState): SkjemaelementFeil | undefined {
    return field.touched && field.error !== undefined ? { feilmelding: <>{field.error}</> } : undefined;
}
