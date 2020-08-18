export const validationRules = {
    fritekst: (verdi, opts) => {
        if (!verdi || verdi.length === 0) {
            return 'required';
        }
        if (verdi && verdi.length > opts.maxLength) {
            return 'max-len';
        }
        return undefined;
    },
    godkjennVilkaar: (verdi) => {
        if (verdi !== true) {
            return 'required';
        }
        return undefined;
    }
};
const defaultOpts = {
    maxLength: 1000
};

export function validate(verdier, opts = {}) {
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

