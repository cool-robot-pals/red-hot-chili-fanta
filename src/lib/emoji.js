const twemoji = require('twemoji');
const emojis = require('unicode-emoji-json/data-by-emoji');

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
	const found = Object.entries(emojis).find(
		([key, { name }]) => key === emoji.trim()
	);

	if (found) return found[1].name;
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
