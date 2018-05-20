const makePost = require('./../src/make-post');
const makeProduct = require('./../src/make-product');

makeProduct()
	.then(makePost)
	.then(console.log);
