import { sjekkStatuskode, toJson, getCookie } from './ducks-utils';

function createReponse(response: Partial<Response>): Response {
    return response as Response;
}

describe('utils', () => {
    describe('Sjekk-statuskode', () => {
        it('Skal returnere response når status er ok', () => {
            const response = createReponse({
                ok: true,
                status: 200,
                statusText: 'Status OK'
            });
            expect(sjekkStatuskode(response)).toEqual(response);
        });
        it('Skal returnere error når respons ikke er ok', () => {
            const response = createReponse({
                ok: false,
                status: 200,
                statusText: 'Feilstatus'
            });
            expect(() => sjekkStatuskode(response)).toThrow(Error);
        });
        it('Skal returnere error når status er over 299', () => {
            const response = createReponse({
                ok: true,
                status: 300,
                statusText: 'Feilstatus'
            });
            expect(() => sjekkStatuskode(response)).toThrow(Error);
        });
        it('Skal returnere error når status er under 200', () => {
            const response = createReponse({
                ok: true,
                status: 199,
                statusText: 'Feilstatus'
            });
            expect(() => sjekkStatuskode(response)).toThrow(Error);
        });
        it('Skal returnere error når statuskode er under 200 og ok er false', () => {
            const response = createReponse({
                ok: false,
                status: 199,
                statusText: 'Feilstatus'
            });
            expect(() => sjekkStatuskode(response)).toThrow(Error);
        });
    });
    describe('toJson', () => {
        it('Sjekk at funksjonen returnere json ved gyldig status', () => {
            const response = createReponse({
                status: 200,
                json: () =>
                    new Promise(() => {
                        testprop: 'testprop';
                    })
            });
            expect(toJson(response)).toEqual(response.json());
        });
        it('Returnerer respons ved 204', () => {
            const response = createReponse({
                status: 204,
                json: () =>
                    new Promise(() => {
                        testprop: 'testprop';
                    })
            });
            expect(toJson(response)).toEqual(response);
        });
    });
    describe('getCookie', () => {
        it('Henter ut fra cookie', () => {
            window.document.cookie = 'test1=detteerentest123; test2=detteerogsåentest123';
            expect(getCookie('test1')).toEqual('detteerentest123');
        });
        it('Tom streng ved inge match', () => {
            window.document.cookie = 'test1=detteerentest123; test2=detteerogsåentest123';
            expect(getCookie('test0')).toEqual('');
        });
    });
});
