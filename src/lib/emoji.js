const emojiDict = require('emoji-dictionary');

const twemoji = require('twemoji');

const badEmojiNames = [
	['couplekiss', 'couple kiss'],
	['woman', ''],
	['man', ''],
];

const fixBadEmojiNames = text => {
	badEmojiNames.forEach(badName => {
		text = text.replace(new RegExp(badName[0], 'g'), badName[1]);
	});
	return text;
};

const getName = edible =>
	fixBadEmojiNames((emojiDict.getName(edible) || 'mystery').toLowerCase())
		.replace(/_/g, ' ')
		.replace(/[\d-]/g, '')
		.replace(/ +/g, ' ')
		.trim();

const getPoint = edible =>
	new Promise(_ => {
		twemoji.parse(edible, a => _(a));
	});

module.exports = { getName, getPoint };
