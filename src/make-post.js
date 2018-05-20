const maker = require('./make-product');
const fs = require('fs');
const { randomArrKey, txtToArr } = require('./lib/helper');

const vocabulary = txtToArr(
	fs.readFileSync('./assets/words/tweets.txt', 'utf8')
);

const makePost = async product => {
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
