import * as React from 'react';
import { FieldState } from '@nutgaard/use-formstate';

export function feilmelding(field: FieldState): React.ReactNode | undefined {
    return field.touched && field.error !== undefined ? <>{field.error}</> : undefined;
}
