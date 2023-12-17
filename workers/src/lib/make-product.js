import { fiddleColor, randomArrKey } from './helper';
import svgColors from 'get-svg-colors';
import { getName, getPoint } from './emoji';
import { allEdibles } from './edible-emoji';
import { adjectives } from './adjectives';
import { tweets } from './tweets';

const colors = async (point, hasContrastRoundel) => {
	const svg = await fetch(
		`https://rawcdn.githack.com/twitter/twemoji/d94f4cf793e6d5ca592aa00f58a88f6a4229ad43/assets/svg/${point}.svg`
	).then((a) => a.text());

	const all = svgColors(svg).fills.map(fiddleColor);

	const hero = randomArrKey(all);
	const roundel = hasContrastRoundel ? randomArrKey(all) : hero;

	return {
		all,
		hero,
		roundel,
	};
};

export const makeProduct = async () => {
	const name = [];

	const isTwofer = Math.random() > 0.95;

	const adj = randomArrKey(adjectives);
	const edibles = isTwofer ? [randomArrKey(allEdibles), randomArrKey(allEdibles)] : [randomArrKey(allEdibles)];

	const edibleNames = edibles.map(getName);
	const points = await Promise.all(edibles.map(getPoint));
	const hasAdj = Math.random() > (isTwofer ? 0.9 : 0.33);
	const zero = Math.random() > 0.95;
	const hasContrastRoundel = Math.random() > 0.75;
	const divider = randomArrKey([' & ', ' and ', ' with ', 'ey ']);

	if (hasAdj) name.push(adj);
	name.push(...edibleNames.join(divider).split(' '));

	return {
		edibles: points.map(
			(point) => `https://rawcdn.githack.com/twitter/twemoji/d94f4cf793e6d5ca592aa00f58a88f6a4229ad43/assets/svg/${point}.svg`
		),
		colors: await colors(randomArrKey(points), hasContrastRoundel),
		name,
		zero,
		isTwofer,
	};
};

export const makePost = async (product) => {
	const name = [...product.name, product.zero ? 'fanta zero' : 'fanta']
		.join(' ')
		.split(' ')
		.map((word) =>
			word
				.split('')
				.map((letter, i) => (i === 0 ? letter.toUpperCase() : letter.toLowerCase()))
				.join('')
		)
		.join(' ');

	const tweet = randomArrKey(tweets).replace('$1', name);

	return {
		product,
		name,
		tweet,
	};
};
