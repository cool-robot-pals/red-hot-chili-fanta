const download = require('download-git-repo');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const fs = require('fs');

const emojipath = path.resolve(__dirname, '..', 'emoji');
const tempemojipath = path.resolve(__dirname, '..', 'emoji-tmp');

console.log(chalk.blue('- setting up dirs'));
for (let path of [emojipath, tempemojipath]) {
	rimraf.sync(path);
	fs.mkdirSync(path);
}

console.log(chalk.blue('- downloading emoji'));
download(
	'twitter/twemoji#4c21f09d6b4f6f89787bd5426d8f3aae500a9613',
	tempemojipath,
	err => {
		if (err) throw err;
		console.log(chalk.blue('- moving svg'));
		fs.renameSync(path.resolve(tempemojipath, 'assets/svg'), emojipath);
		rimraf.sync(tempemojipath);

		console.log(chalk.green('done!'));
	}
);
