const { getName, getPoint } = require('./emoji.js');

const emojiDict = require('emoji-dictionary');

jest.mock('emoji-dictionary', () => ({
	getName: jest.fn(() => 'test emoji'),
}));
jest.mock('twemoji', () => ({
	parse: jest.fn((a, b) => b('0123')),
}));

describe('getName', () => {
	it('should return a valid emoji name', async () => {
		expect(getName('mock')).toBe('test emoji');
	});
	it('should mysterious if null', async () => {
		emojiDict.getName.mockReturnValueOnce(undefined);
		expect(getName('mock')).toBe('mystery');
	});
});

describe('getPoint', () => {
	it('should wrap twemoji', async () => {
		expect(await getPoint('mock')).toBe('0123');
	});
});
