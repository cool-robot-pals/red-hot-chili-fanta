// @flow
const make = require('./product-maker.js');

const mockColor = {
	_rgb: 12,
};

jest.mock('emoji-dictionary', () => ({
	getName: jest.fn(() => 'test emoji'),
}));
jest.mock('twemoji', () => ({
	parse: jest.fn((a, b) => b('testmoji')),
}));
jest.mock('get-image-colors', () =>
	jest.fn(() => Promise.resolve([mockColor]))
);
jest.mock('fs', () => ({
	readFileSync: jest.fn(() => '🙂🙂🙂🙂'),
}));

describe('productMaker', () => {
	it('should return an edible', async () => {
		expect(await make()).toMatchObject({
			edible: 'testmoji',
		});
	});
	it('should return colors', async () => {
		expect(await make()).toMatchObject({
			hero: mockColor,
			palette: [mockColor],
		});
	});
	it('should return a product', async () => {
		expect(await make()).toMatchObject({
			product: expect.arrayContaining([]),
		});
	});
});
