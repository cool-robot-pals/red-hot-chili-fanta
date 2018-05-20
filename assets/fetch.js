const fetcher = async () => {
	const data = await fetch('/make')
		.then(_ => _.json())
		.catch(() => {});
	if (!data || !data.product) return fetcher();
	else return data;
};

const go = async () => {
	const data = await fetcher();

	const product = data.product;

	const rotation = 5 - Math.random() * 10;

	document.querySelector('x-fanta x-label').innerHTML = product.name
		.map(_ => _.split(' '))
		.reduce((a, b) => a.concat(b), [])
		.map(_ => `<span>${_}</span>`)
		.join('');
	document.querySelector('x-fanta .edible').src = `/emoji/${
		product.edible
	}.svg`;
	document
		.querySelector('x-fanta')
		.attributeStyleMap.set(
			'background-color',
			`rgb(${product.hero._rgb.join()})`
		);
	document
		.querySelector('x-fanta')
		.attributeStyleMap.set('transform', `rotate(${rotation}deg)`);
	document
		.querySelector('body')
		.attributeStyleMap.set(
			'background-color',
			`rgb(${product.palette[0]._rgb.join()})`
		);

	console.log(JSON.stringify(data));
};
go();
