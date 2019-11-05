const download = require('download-git-repo');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs');
const emojipath = path.resolve(__dirname, '..', 'emoji');

console.log(chalk.blue('- setting up dirs'));
rimraf.sync(emojipath);
fs.mkdirSync(emojipath);
console.log(chalk.blue('- downloading emoji'));
download(
	'twitter/twemoji#4c21f09d6b4f6f89787bd5426d8f3aae500a9613',
	emojipath,
	err => {
		if (err) throw err;
		console.log(chalk.green('done!'));
	}
);
