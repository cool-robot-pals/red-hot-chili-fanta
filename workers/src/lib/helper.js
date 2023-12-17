export const randomArrKey = (items) => items[Math.floor(Math.random() * items.length)];

export const txtToArr = (txt) => txt.split('\n').filter((_) => _ != '');

export const fiddleColor = (color) => {
	const fuzzyness = 100;
	[0, 1, 2].forEach((i) => {
		color._rgb[i] = color._rgb[i] - fuzzyness / 2 + Math.random() * fuzzyness;
	});
	return color;
};
