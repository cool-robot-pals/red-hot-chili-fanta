const fs = require('fs');
const colors = require('get-image-colors');

const { fiddleColor, randomArrKey, txtToArr } = require('./lib/helper');

const { getName, getPoint } = require('./lib/emoji');

const edibles = txtToArr(
	fs.readFileSync('./assets/words/edible-emoji.txt', 'utf8')
);

const adjs = txtToArr(fs.readFileSync('./assets/words/adjectives.txt', 'utf8'));

const make = async () => {
	const name = [];
	const [edible, adj] = [randomArrKey(edibles), randomArrKey(adjs)];

	const edibleName = getName(edible);
	const point = await getPoint(edible);
	const hasAdj = Math.random() > 0.2;

	const palette = await colors(
		`./node_modules/twemoji/2/svg/${point}.svg`
	).then(_ => _.map(fiddleColor));

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
