const maker = require('./make-product');
const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

const vocabulary = [
	'Beat the heat with $1!',
	'Relax with a fresh $1',
	'Chill alongside a $1',
	'Try the new $1',
	'Enjoy some $1',
	'Ever tried $1?',
];

const makePost = async () => {
	const product = await maker();

	const name = [...product.name, 'fanta']
		.join(' ')
		.split(' ')
		.map(word =>
			word
				.split('')
				.map(
					(letter, i) => (i === 0 ? letter.toUpperCase() : letter.toLowerCase())
				)
				.join('')
		)
		.join(' ');

	const tweet = randomArrKey(vocabulary).replace('$1', name);

	return {
		product,
		name,
		tweet,
	};
};

module.exports = makePost;
