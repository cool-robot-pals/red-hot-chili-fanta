const fs = require('fs');
const emojiDict = require('emoji-dictionary');
const twemoji = require('twemoji');
const colors = require('get-image-colors');
const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

const edibles = [...fs.readFileSync('./assets/words/edible-emoji.txt', 'utf8')];
const adjs = fs
	.readFileSync('./assets/words/adjectives.txt', 'utf8')
	.split('\n')
	.filter(_ => _ != '');

const fiddle = color => {
	const fuzzyness = 100;
	[0, 1, 2].forEach(i => {
		color._rgb[i] = color._rgb[i] - fuzzyness / 2 + Math.random() * fuzzyness;
	});
	return color;
};

const make = async () => {
	const name = [];
	const [edible, adj] = [randomArrKey(edibles), randomArrKey(adjs)];
	const edibleName = emojiDict
		.getName(edible)
		.replace(/_/g, ' ')
		.replace(/[\d-]/g, '');
	const hasAdj = Math.random() > 0.2;

	const point = await new Promise(_ => {
		twemoji.parse(edible, a => _(a));
	});

	const palette = await colors(
		`./node_modules/twemoji/2/svg/${point}.svg`
	).then(_ => _.map(fiddle));

	if (hasAdj) name.push(adj);
	name.push(edibleName);

	return {
		edible: point,
		hero: randomArrKey(palette),
		palette,
		name,
	};
};

module.exports = make;
