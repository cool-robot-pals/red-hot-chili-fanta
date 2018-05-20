// @flow
const make = require('./make-post.js');

const mockProduct = {
	name: ['feisty', 'lollipop'],
};

const expectedName = 'Feisty Lollipop Fanta';

describe('make-post', () => {
	it('should return a formatted name', async () => {
		expect(await make(mockProduct)).toMatchObject({
			name: expectedName,
		});
	});
	it('should return a tweet', async () => {
		expect(await make(mockProduct)).toMatchObject({
			tweet: expect.stringContaining(expectedName),
		});
	});
	it('should contain the original product', async () => {
		expect(await make(mockProduct)).toMatchObject({
			product: mockProduct,
		});
	});
});
