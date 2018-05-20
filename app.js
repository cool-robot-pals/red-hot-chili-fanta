const app = require('./src/express.js');
const config = require('./.fantarc');

app.listen(config.ports.live, () =>
	console.log(`Listening on port ${config.ports.live}!`)
);
