import * as React from "react";
import { FieldState } from "@nutgaard/use-formstate";
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

type ValidationRule = (verdi?: any, opts?: any) => string | undefined;
type ValidationRuleMap = { [key: string]: ValidationRule; };

export const validationRules: ValidationRuleMap = {
    fritekst: (verdi? : any, opts? : any) => {
        if (!verdi || verdi.length === 0) {
            return 'required';
        }
        if (verdi && verdi.length > opts.maxLength) {
            return 'max-len';
        }
        return undefined;
    },
    godkjennVilkaar: (verdi?: boolean) => {
        if (verdi !== true) {
            return 'required';
        }
        return undefined;
    }
};
const defaultOpts = {
    maxLength: 1000
};

export function validate(verdier? : any, opts = {}) {
    const mergedOpts = { ...defaultOpts, ...opts };
    return Object.entries(verdier).reduce((errors, [felt, verdi]) => {
        if (!validationRules.hasOwnProperty(felt)) {
            return errors;
        }
        const feltError = validationRules[felt](verdi, mergedOpts);
        if (feltError) {
            return { ...errors, [felt]: feltError };
        }

        return errors;
    }, {});
}

export function feilmelding(field: FieldState): SkjemaelementFeil | undefined {
    return field.touched && field.error !== undefined ? { feilmelding: <>{field.error}</> } : undefined;
}

