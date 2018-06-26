const fs = require('fs');
const imgColors = require('get-image-colors');

const { fiddleColor, randomArrKey, txtToArr } = require('./lib/helper');

const { getName, getPoint } = require('./lib/emoji');

const allEdibles = txtToArr(
	fs.readFileSync('./assets/words/edible-emoji.txt', 'utf8')
);

const adjs = txtToArr(fs.readFileSync('./assets/words/adjectives.txt', 'utf8'));

const colors = async (point, hasContrastRoundel) => {
	const all = await imgColors(`./node_modules/twemoji/2/svg/${point}.svg`).then(
		_ => _.map(fiddleColor)
	);

	const hero = randomArrKey(all);
	const roundel = hasContrastRoundel ? randomArrKey(all) : hero;

	return {
		all,
		hero,
		roundel,
	};
};

const make = async () => {
	const name = [];

	const isTwofer = Math.random() > 0.95;

	const adj = randomArrKey(adjs);
	const edibles = isTwofer
		? [randomArrKey(allEdibles), randomArrKey(allEdibles)]
		: [randomArrKey(allEdibles)];

	const edibleNames = edibles.map(getName);
	const points = await Promise.all(edibles.map(getPoint));
	const hasAdj = Math.random() > (isTwofer ? 0.9 : 0.33);
	const zero = Math.random() > 0.95;
	const hasContrastRoundel = Math.random() > 0.75;
	const divider = randomArrKey([' & ', ' and ', ' with ', 'ey ']);

	if (hasAdj) name.push(adj);
	name.push(...edibleNames.join(divider).split(' '));

	return {
		edibles: points,
		colors: await colors(randomArrKey(points), hasContrastRoundel),
		name,
		zero,
		isTwofer,
	};
};

module.exports = make;
