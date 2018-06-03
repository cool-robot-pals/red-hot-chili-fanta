const fetchData = async () => {
	const data = await fetch('/make')
		.then(_ => _.json())
		.catch(() => {});
	if (!data || !data.product) return fetcher();
	else return data;
};

const fetchLogo = () => fetch('/logo.svg').then(res => res.text());

const makeCssColor = color => `rgba(${color._rgb.map(Math.floor).join()})`;

const buildUpFanta = async ($fanta, data) => {
	const [$logoHolder, $label, $edible] = [
		'x-logo-holder',
		'x-label',
		'.edible',
	].map(_ => $fanta.querySelector(_));

	const cssVars = {
		'bg-hero': makeCssColor(data.product.colors.hero),
		'bg-roundel': makeCssColor(data.product.colors.roundel),
		rotation: `${5 - Math.random() * 10}deg`,
	};

	Object.entries(cssVars).forEach(([key, value]) => {
		$fanta.style.setProperty(`--${key}`, value);
	});

	$label.innerHTML = data.product.name
		.map(_ => _.split(' '))
		.reduce((a, b) => a.concat(b), [])
		.map(_ => `<span>${_}</span>`)
		.join('');

	$edible.src = `/emoji/${data.product.edible}.svg`;

	$logoHolder.innerHTML = await fetchLogo();

	if (data.product.zero) {
		const $zero = document.createElement('x-zero');
		document.querySelector('x-fanta').appendChild($zero);
	}

	return true;
};

const go = async () => {
	const $fanta = document.querySelector('x-fanta');
	const data = await fetchData();

	document.body.style.backgroundColor = makeCssColor(
		data.product.colors.all[0]
	);

	await buildUpFanta($fanta, data);

	console.log(JSON.stringify(data));
};
go();
