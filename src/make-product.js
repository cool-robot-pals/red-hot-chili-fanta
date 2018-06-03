const fs = require('fs');
const imgColors = require('get-image-colors');

const { fiddleColor, randomArrKey, txtToArr } = require('./lib/helper');

const { getName, getPoint } = require('./lib/emoji');

const edibles = txtToArr(
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
	const [edible, adj] = [randomArrKey(edibles), randomArrKey(adjs)];

	const edibleName = getName(edible);
	const point = await getPoint(edible);
	const hasAdj = Math.random() > 0.33;
	const zero = Math.random() > 0.75;
	const hasContrastRoundel = Math.random() > 0.75;

	if (hasAdj) name.push(adj);
	name.push(edibleName);

	return {
		edible: point,
		colors: await colors(point, hasContrastRoundel),
		name,
		zero,
	};
};

module.exports = make;
