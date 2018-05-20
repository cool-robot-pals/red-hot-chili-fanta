require('dotenv').config();

const getFanta = require('./make-screenshot');
const config = require('../.fantarc');
const twitter = require('twitter');
const fs = require('fs');
const chalk = require('chalk');
const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

const vocabulary = [
	'Beat the heat with $1!',
	'Relax with a fresh $1',
	'Chill alongside a $1',
	'Try the new $1',
	'Enjoy some $1',
	'Ever tried $1?',
];

const client = new twitter({
	consumer_key: process.env.TWITTER_CK,
	consumer_secret: process.env.TWITTER_CS,
	access_token_key: process.env.TWITTER_TK,
	access_token_secret: process.env.TWITTER_TS,
});

(async () => {
	try {
		const data = await getFanta();

		const product = [...data.product, 'fanta']
			.join(' ')
			.split(' ')
			.map(word =>
				word
					.split('')
					.map(
						(letter, i) =>
							i === 0 ? letter.toUpperCase() : letter.toLowerCase()
					)
					.join('')
			)
			.join(' ');

		const body = randomArrKey(vocabulary).replace('$1', product);

		console.info(chalk.blue(`i Post info:`));
		console.info(body, data);

		await client
			.post('media/upload', { media: fs.readFileSync(config.paths.screenie) })
			.then(screenshot =>
				client.post('statuses/update', {
					media_ids: screenshot.media_id_string,
					status: body,
				})
			)
			.then(tweet => {
				console.info(chalk.green(`✔ Posted: ${body}`));
				console.info(tweet);
				return true;
			});
	} catch (error) {
		console.error(chalk.red('✘ Post failed'));
		console.error(error);
		return;
	}

	process.exit();
})();
