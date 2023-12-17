const repoUrl = 'https://raw.githubusercontent.com/cool-robot-pals/red-hot-chili-fanta/79aecbc9ad4d9bed739222c4b005cb68db469ede/assets';

const css = (cssVars) => `
@import url(https://fonts.googleapis.com/css?family=Fredoka+One);

body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  -webkit-font-smoothing: antialiased;
	background: ${cssVars.body} ;
}

.zero {
  position: absolute;
  background: #999 url(${repoUrl}/zero-sugar.svg) no-repeat;
  background-position: 50% 18%;
  background-size: 60%;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
}

.fanta {
  width: 1000px;
  height: 2000px;
  display: block;
  position: relative;
  -webkit-mask: url(${repoUrl}/can-mask.png) no-repeat center;
  -webkit-mask-size: contain;
  mask: url(${repoUrl}/can-mask.png) no-repeat center;
  mask-size: contain;
  background-color: ${cssVars['bg-hero']};
  transform: rotate(${cssVars['rotation']});
}

.fanta .logo {
  z-index: 50;
}

.fanta .zero {
  z-index: 49;
}

.fanta:before {
  background: url(${repoUrl}/can.png) no-repeat center;
  mi.blend-mode: color-dodge;
  z-index: 98;
}
.fanta:after {
  background: url(${repoUrl}/can-cap.png) no-repeat center;
  z-index: 99;
}

.fanta:after,
.fanta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  width: 100%;
  background-size: contain;
  pointer-events: none;
}

.logo > * {
  position: absolute;
}

.logo {
  width: 1000px;
  height: 90%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform: rotate(-7deg) scale(1.2) translateX(-1%);
}

.label {
  color: white;
  font-size: 75px;
  text-transform: capitalize;
  font-family: "Fredoka One", sans-serif;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  right: 40%;
  left: 10%;
  top: 60%;
  line-height: 1.2;
  z-index: 10;
	position: absolute ;
}

.label span {
  background: #77b94c;
  padding: 0em 0.5em;
  display: inline-block;
  margin-left: -0.25em;
  margin-right: -0.225em;
  margin-bottom: 0.1em;
}

.fanta .logo-holder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.fanta .logo-holder svg {
  width: 100%;
  height: 100%;
}

.fanta .logo-holder #roundel {
  fill: ${cssVars['bg-roundel']};
}

.fanta .edibles {
  position: absolute;
  top: 56%;
  left: 54%;
  right: 0;
  bottom: 0;
  width: 36%;
  height: 22%;
  --offset: -15%;
}

.fanta .edibles img {
  width: 100%;
  position: absolute;
}

.fanta .edibles[data-length="2"] img {
  position: absolute;
  transform: scale(0.8);
}

.fanta .edibles[data-length="2"] img:last-child {
  bottom: calc(var(--offset) * 1);
  left: var(--offset);
}

.fanta .edibles[data-length="2"] img:first-child {
  right: var(--offset);
  top: calc(var(--offset) * 1);
}
`;
const makeCssColor = (color) => `rgba(${color._rgb.map(Math.floor).join()})`;
export const HTMLRoute = (props) => {
	const label = props.product.name.map((_) => _.split(' ')).reduce((a, b) => a.concat(b), []);

	const cssVars = {
		'bg-hero': makeCssColor(props.product.colors.hero),
		'bg-roundel': makeCssColor(props.product.colors.roundel),
		rotation: `${5 - Math.random() * 10}deg`,
		body: makeCssColor(props.product.colors.all[0]),
	};
	return new Response(
		`<html>
		<style>${css(cssVars)}</style>
		<body>
			<div class="fanta">
				<div class="logo">
					<img class="logo-holder" src="${repoUrl + '/logo.svg'}" />
					<div class="label">
						${label.map((l) => `<span>${l}</span>`)}
					</div>
					<div class="edibles">
						${props.product.edibles.map((l) => `<img src="${l}" />`)}
					</div>
				</div>
				${props.product.zero ? `<div class="zero"></div>` : ''}
			</div>
		</body>
		</html>`,
		{ headers: { 'Content-Type': 'text/html' } }
	);
};
