const express = require('express');
const path = require('path');
const app = express();
const makePost = require('./make-post');
const makeProduct = require('./make-product');

app.use(express.static('assets'));
app.use('/emoji', express.static('node_modules/twemoji/2/svg'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/../assets/index.html'));
});
app.get('/make', async (req, res) => {
	try {
		res.json(await makeProduct().then(makePost));
	} catch (e) {
		console.error(e);
		res.status(500).send('Something broke!');
	}
});

module.exports = app;
