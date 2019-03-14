const { getName, getPoint } = require('./emoji.js');

jest.mock('emojilib', () => ({
	lib: {
		test_emoji: {
			char: 'mock',
		},
	},
}));
jest.mock('twemoji', () => ({
	parse: jest.fn((a, b) => b('0123')),
}));

describe('getName', () => {
	it('should return a valid emoji name', async () => {
		expect(getName('mock')).toBe('test emoji');
	});
	it('should mysterious if null', async () => {
		expect(getName('non-existing-mock')).toBe('mystery');
	});
});

describe('getPoint', () => {
	it('should wrap twemoji', async () => {
		expect(await getPoint('mock')).toBe('0123');
	});
});
