const getFanta = require('./make-screenshot');

getFanta()
	.then(log => {
		console.log(log);
		process.exit();
	})
	.catch(err => {
		throw err;
	});
