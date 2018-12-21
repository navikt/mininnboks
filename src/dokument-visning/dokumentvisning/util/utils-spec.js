/* eslint-env mocha */
import { expect } from 'chai';
import * as Utils from './utils';

describe('Utils', () => {
    describe('arr', () => {
        it('skal returnere samme array om input er en array', () => {
            const input = ['array'];

            const result = Utils.arr(input);

            expect(result).to.equal(input);
        });
        it('skal returnere array om input er en verdi', () => {
            const input = 'verdi';

            const result = Utils.arr(input);

            expect(Array.isArray(result)).to.equal(true);
            expect(result.length).to.equal(1);
            expect(result[0]).to.equal(input);
        });
    });
    describe('lagOffset', () => {
        it('skal returnere en liste av riktig lengde', () => {
            const result = Utils.lagOffset(10, [0]);

            expect(result.length).to.equal(10);
        });

        it('skal kopiere siste element i listen', () => {
            const result = Utils.lagOffset(3, [0, 'a']);

            expect(result.length).to.equal(3);
            expect(result[0]).to.equal(0);
            expect(result[1]).to.equal('a');
            expect(result[2]).to.equal('a');
        });
    });
    describe('zip', () => {
        it('skal slå sammen listene', () => {
            const liste1 = [{ a: 1}, { a: 2}];
            const liste2 = ['a', 'b'];

            const result = Utils.zip(liste1, liste2, 'b');

            expect(result.length).to.equal(2);
            expect(result[0].a).to.equal(1);
            expect(result[0].b).to.equal('a');
            expect(result[1].a).to.equal(2);
            expect(result[1].b).to.equal('b');
        });
    });
});
