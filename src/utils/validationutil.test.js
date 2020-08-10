/* eslint-env mocha */
import * as Validationutils from './validationutil';
import { expect } from 'chai';

describe('validationRules', () => {
    describe('fritekst', () => {
        it('skal feile om teksten ikke er definert', () => {
            const undefinedTekst = Validationutils.validationRules.fritekst();
            const tomTekst = Validationutils.validationRules.fritekst('');

            expect(undefinedTekst).to.equal('required');
            expect(tomTekst).to.equal('required');
        });

        it('skal feile om teksten er for lang', () => {
            const langTekst = Validationutils.validationRules.fritekst(new Array(1005).join('x'), {maxLength: 1000});

            expect(langTekst).to.equal('max-len');
        });
    });

    describe('godkjennVilkår', () => {
        it('skal feile om verdien er false', () => {
            const undefinedTest = Validationutils.validationRules.godkjennVilkaar();
            const ikkeTrueTest = Validationutils.validationRules.godkjennVilkaar(false);

            expect(undefinedTest).to.equal('required');
            expect(ikkeTrueTest).to.equal('required');
        });
    });
});

describe('validate', () => {
    it('skal gi tomt object om alt er ok', () => {
        const formState = {
            fritekst: 'hei',
            godkjennVilkaar: true
        };
        const formStatus = Validationutils.validate(formState);

        expect(formStatus).to.deep.equal({});
    });

    it('skal gi feilmeldinger for alle feilene', () => {
        const formState = { fritekst: undefined, godkjennVilkaar: undefined };
        const formStatus = Validationutils.validate(formState);

        expect(formStatus).to.deep.equal({
            fritekst: 'required',
            godkjennVilkaar: 'required'
        });
    });

    it('skal gi true på tegn over under 2500 ', () => {
        const langTekst = new Array(2499).join('x');

        const formState = {
            fritekst: langTekst,
        };
        const formStatus = Validationutils.validate(formState, {maxLength: 2500});

        expect(formStatus).to.deep.equal({});
    });
});

