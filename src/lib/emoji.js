const emojiDict = require('emoji-dictionary');

const twemoji = require('twemoji');

const getName = edible =>
	(emojiDict.getName(edible) || 'mystery')
		.replace(/_/g, ' ')
		.replace(/[\d-]/g, '');

const getPoint = edible =>
	new Promise(_ => {
		twemoji.parse(edible, a => _(a));
	});

module.exports = { getName, getPoint };
