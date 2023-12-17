import twemoji from 'twemoji';
import emojis from 'unicode-emoji-json/data-by-emoji';

const emojiNameReplacements = [
	['couplekiss', 'couple kiss'],
	['womans', ''],
	['mans', ''],
	['woman', ''],
	['man', ''],
];

export const replaceEmojiNames = (text) => {
	emojiNameReplacements.forEach((_) => {
		text = text.replace(new RegExp(_[0], 'g'), _[1]);
	});
	return text;
};

export const getEmojiName = (emoji) => {
	const found = Object.entries(emojis).find(([key, { name }]) => key === emoji.trim());

	if (found) return found[1].name;
	else return 'mystery';
};

export const getName = (emoji) =>
	replaceEmojiNames(getEmojiName(emoji).toLowerCase()).replace(/_/g, ' ').replace(/[\d-]/g, '').replace(/ +/g, ' ').trim();

export const getPoint = (emoji) =>
	new Promise((_) => {
		twemoji.parse(emoji, (a) => _(a));
	});
