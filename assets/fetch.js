const fetcher = async () => {
	const data = await fetch('/make')
		.then(_ => _.json())
		.catch(() => {});
	if (!data || !data.product) return fetcher();
	else return data;
};

const getLogo = () => fetch('/logo.svg').then(res => res.text());

const makeCssColor = color => `rgba(${color._rgb.map(Math.floor).join()})`;

const go = async () => {
	const data = await fetcher();
	const product = data.product;
	const rotation = 5 - Math.random() * 10;

	const $fanta = document.querySelector('x-fanta');
	const $logoHolder = $fanta.querySelector('x-logo-holder');

	$fanta.style.setProperty('--bg-hero', makeCssColor(product.colors.hero));
	$fanta.style.setProperty(
		'--bg-roundel',
		makeCssColor(product.colors.roundel)
	);

	await getLogo().then(logo => ($logoHolder.innerHTML = logo));

	if (data.product.zero) {
		const $zero = document.createElement('x-zero');
		document.querySelector('x-fanta').appendChild($zero);
	}

	document.querySelector('x-fanta x-label').innerHTML = product.name
		.map(_ => _.split(' '))
		.reduce((a, b) => a.concat(b), [])
		.map(_ => `<span>${_}</span>`)
		.join('');

	document.querySelector('x-fanta .edible').src = `/emoji/${
		product.edible
	}.svg`;

	document.querySelector('x-fanta').style.transform = `rotate(${rotation}deg)`;

	document.querySelector(
		'body'
	).style.backgroundColor = `rgba(${product.colors.all[0]._rgb
		.map(Math.floor)
		.join()})`;

	console.log(JSON.stringify(data));
};
go();
