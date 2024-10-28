import { getParams } from './url';

describe('url', () => {
    describe('getParams', () => {
        beforeEach(() => {
            Object.defineProperty(window, 'location', {
                value: { search: '' },
                writable: true,
            });
        });

        it('should return an object with correct keys and values from query string', () => {
            window.location.search = '?name=John&age=30&city=NewYork';

            const params = getParams<{ name: string; age: string; city: string }>();
            expect(params).toEqual({ name: 'John', age: '30', city: 'NewYork' });
        });

        it('should return an empty object if there are no parameters', () => {
            window.location.search = '';

            const params = getParams();
            expect(params).toEqual({});
        });

        it('should handle parameters with empty values', () => {
            window.location.search = '?name=John&age=&city=NewYork';

            const params = getParams<{ name: string; age: string; city: string }>();
            expect(params).toEqual({ name: 'John', age: '', city: 'NewYork' });
        });

        it('should handle parameters with special characters', () => {
            window.location.search = '?name=Jöhn&city=São+Paulo';

            const params = getParams<{ name: string; city: string }>();
            expect(params).toEqual({ name: 'Jöhn', city: 'São+Paulo' });
        });
    });
});