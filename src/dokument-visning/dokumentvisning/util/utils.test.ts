import * as Utils from './utils';

describe('Utils', () => {
    describe('arr', () => {
        it('skal returnere samme array om input er en array', () => {
            const input = ['array'];

            const result = Utils.arr(input);

            expect(result).toEqual(input);
        });
        it('skal returnere array om input er en verdi', () => {
            const input = 'verdi';

            const result = Utils.arr(input);

            expect(Array.isArray(result)).toEqual(true);
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(input);
        });
    });
    describe('lagOffset', () => {
        it('skal returnere en liste av riktig lengde', () => {
            const result = Utils.lagOffset(10, [0]);

            expect(result.length).toEqual(10);
        });

        it('skal kopiere siste element i listen', () => {
            const result = Utils.lagOffset(3, [0, 'a']);

            expect(result.length).toEqual(3);
            expect(result[0]).toEqual(0);
            expect(result[1]).toEqual('a');
            expect(result[2]).toEqual('a');
        });
    });
    describe('zip', () => {
        it('skal slå sammen listene', () => {
            const liste1 = [{ a: 1}, { a: 2}];
            const liste2 = ['a', 'b'];

            const result = Utils.zip(liste1, liste2, 'b');

            expect(result.length).toEqual(2);
            expect(result[0].a).toEqual(1);
            expect(result[0].b).toEqual('a');
            expect(result[1].a).toEqual(2);
            expect(result[1].b).toEqual('b');
        });
    });
});
