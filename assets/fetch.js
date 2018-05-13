const fetcher = async () => {
	const data = await fetch('/make').then(_=>_.json()).catch(()=>{});
	if(!data || !data.product) return fetcher();
	else return data
}

const go = async () => {
	const data = await fetcher();

	document.querySelector('x-fanta x-label').innerHTML =
		data.product
			.map(_=>_.split(' '))
			.reduce((a, b) => a.concat(b), [])
			.map(_=>`<span>${_}</span>`)
			.join('');
	document.querySelector('x-fanta .edible').src = `/emoji/${data.edible}.svg`;
	document.querySelector('x-fanta').style.backgroundColor = `rgba(${data.hero._rgb.join()})`;
	document.querySelector('body').style.backgroundColor = `rgba(${data.palette[0]._rgb.join()})`;
}
go();
