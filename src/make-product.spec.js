const make = require('./make-product.js');

const mockColor = {
	_rgb: 12,
};

jest.mock('./lib/emoji', () => ({
	getName: jest.fn(() => 'test emoji'),
	getPoint: jest.fn(() => '01234'),
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
			edibles: expect.arrayContaining(['01234']),
		});
	});
	it('should return colors', async () => {
		expect(await make()).toMatchObject({
			colors: {
				all: [mockColor],
				roundel: mockColor,
				hero: mockColor,
			},
		});
	});
	it('should return a name', async () => {
		expect(await make()).toMatchObject({
			name: expect.arrayContaining([]),
		});
	});
});
