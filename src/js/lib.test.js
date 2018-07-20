import { generateAtomicClass } from './lib';

describe('#generateAtomicClass', () => {
    test('should create correct atomic class', () => {
        expect(
            generateAtomicClass('padding-top: 112px; display: flex;')
        ).toEqual({ acss: 'Pt(112px) D(f)' });
    });
});
