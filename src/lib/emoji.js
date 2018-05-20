const emojiDict = require('emoji-dictionary');
const twemoji = require('twemoji');

const emojiNameReplacements = [
	['couplekiss', 'couple kiss'],
	['woman', ''],
	['man', ''],
];

const replaceEmojiNames = text => {
	emojiNameReplacements.forEach(_ => {
		text = text.replace(new RegExp(_[0], 'g'), _[1]);
	});
	return text;
};

const getName = emoji =>
	replaceEmojiNames((emojiDict.getName(emoji) || 'mystery').toLowerCase())
		.replace(/_/g, ' ')
		.replace(/[\d-]/g, '')
		.replace(/ +/g, ' ')
		.trim();

const getPoint = emoji =>
	new Promise(_ => {
		twemoji.parse(emoji, a => _(a));
	});

module.exports = { getName, getPoint };
