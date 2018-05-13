const express = require('express')
const path = require('path')
const app = express()
const maker = require('./product-maker');

app.use(express.static('assets'))
app.use('/emoji',express.static('node_modules/twemoji/2/svg'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/make', async (req, res) => {
	try {
		res.json(await maker())
	} catch(e) {
		console.error(e);
		res.status(500).send('Something broke!')
	}
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
