const server = require('../src/express.js');
const config = require('../.fantarc');
const puppeteer = require('puppeteer');
const path = require('path');

const outPath = config.paths.screenie;

const startServer = () =>
	new Promise(rt => {
		server.listen(
			config.ports.test,
			rt(`http://localhost:${config.ports.test}`)
		);
	});

const takeScreenshot = async url => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		ignoreHTTPSErrors: true,
	});
	const page = await browser.newPage();

	return new Promise((yay, nay) => {
		page.on('console', async msg => {
			try {
				const log = JSON.parse(msg.text());
				if (!log.product) {
					throw new Error('invalid fanta');
				}
				await page.screenshot({ path: outPath, type: 'png' });
				await browser.close();
				yay(log);
			} catch (e) {
				nay([e, msg]);
			}
		});
		Promise.all([
			page.setViewport({ width: 4400, height: 2500 }),
			page.goto(url),
		]);
	});
};

module.exports = () => startServer().then(url => takeScreenshot(url));
