const twemoji = require('twemoji');
const emojilib = require('emojilib');

const emojiNameReplacements = [
	['couplekiss', 'couple kiss'],
	['womans', ''],
	['mans', ''],
	['woman', ''],
	['man', ''],
];

const replaceEmojiNames = text => {
	emojiNameReplacements.forEach(_ => {
		text = text.replace(new RegExp(_[0], 'g'), _[1]);
	});
	return text;
};

const getEmojiName = emoji => {
	const found = Object.entries(emojilib.lib).find(
		([key, { char }]) => char === emoji.trim()
	);

	if (found) return found[0];
	else return 'mystery';
};

const getName = emoji =>
	replaceEmojiNames(getEmojiName(emoji).toLowerCase())
		.replace(/_/g, ' ')
		.replace(/[\d-]/g, '')
		.replace(/ +/g, ' ')
		.trim();

const getPoint = emoji =>
	new Promise(_ => {
		twemoji.parse(emoji, a => _(a));
	});

module.exports = { getName, getPoint };
