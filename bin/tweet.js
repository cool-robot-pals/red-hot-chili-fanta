require('dotenv').config();

const getFanta = require('./make-screenshot');
const config = require('../.fantarc');
const twitter = require('twitter');
const fs = require('fs');
const chalk = require('chalk');
const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

const client = new twitter({
	consumer_key: process.env.TWITTER_CK,
	consumer_secret: process.env.TWITTER_CS,
	access_token_key: process.env.TWITTER_TK,
	access_token_secret: process.env.TWITTER_TS,
});

(async () => {
	try {
		const data = await getFanta();

		console.info(chalk.blue(`i Post info:`));
		console.info(data.tweet, data);

		await client
			.post('media/upload', { media: fs.readFileSync(config.paths.screenie) })
			.then(screenshot =>
				client.post('statuses/update', {
					media_ids: screenshot.media_id_string,
					status: data.tweet,
				})
			)
			.then(tweet => {
				console.info(chalk.green(`✔ Posted: ${data.tweet}`));
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
