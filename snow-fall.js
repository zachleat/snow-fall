class Snow extends HTMLElement {
	static random(min, max) {
		return min + Math.floor(Math.random() * (max - min) + 1);
	}

	static attrs = {
		count: "count", // default: 100
		mode: "mode",
		text: "text", // text in snow flake (emoji, too)
	}

	generateCss(mode, count) {
		let css = [];
		css.push(`
:host([mode="element"]) {
	display: block;
	position: relative;
	overflow: hidden;
}
:host([mode="page"]) {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
:host([mode="page"]),
:host([mode="element"]) > * {
	pointer-events: none;
}
:host([mode="element"]) ::slotted(*) {
	pointer-events: all;
}
* {
	position: absolute;
}
:host([text]) * {
	font-size: var(--snow-fall-size, 1em);
}
:host(:not([text])) * {
	width: var(--snow-fall-size, 10px);
	height: var(--snow-fall-size, 10px);
	background: var(--snow-fall-color, rgba(255,255,255,.5));
	border-radius: 50%;
}
`);

		// using vw units (max 100)
		let dimensions = { width: 100, height: 100 };
		let units = { x: "vw", y: "vh"};

		if(mode === "element") {
			dimensions = {
				width: this.firstElementChild.clientWidth,
				height: this.firstElementChild.clientHeight,
			};
			units = { x: "px", y: "px"};
		}

		// Thank you @alphardex: https://codepen.io/alphardex/pen/dyPorwJ
		for(let j = 1; j<= count; j++ ) {
			let x = Snow.random(1, 100) * dimensions.width/100; // vw
			let offset = Snow.random(-10, 10) * dimensions.width/100; // vw

			let yoyo = Math.round(Snow.random(30, 100)); // % time
			let yStart = yoyo * dimensions.height/100; // vh
			let yEnd = dimensions.height; // vh

			let scale = Snow.random(1, 10000) * .0001;
			let duration = Snow.random(10, 30);
			let delay = Snow.random(0, 30) * -1;

			css.push(`
:nth-child(${j}) {
	opacity: ${Snow.random(0, 1000) * 0.001};
	transform: translate(${x}${units.x}, -10px) scale(${scale});
	animation: fall-${j} ${duration}s ${delay}s linear infinite;
}

@keyframes fall-${j} {
	${yoyo}% {
		transform: translate(${x + offset}${units.x}, ${yStart}${units.y}) scale(${scale});
	}

	to {
		transform: translate(${x + offset / 2}${units.x}, ${yEnd}${units.y}) scale(${scale});
	}
}`)
		}
		return css.join("\n");
	}

	connectedCallback() {
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(this.shadowRoot || !("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		let count = parseInt(this.getAttribute(Snow.attrs.count)) || 100;

		let mode;
		if(this.hasAttribute(Snow.attrs.mode)) {
			mode = this.getAttribute(Snow.attrs.mode);
		} else {
			mode = this.firstElementChild ? "element" : "page";
			this.setAttribute(Snow.attrs.mode, mode);
		}

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(this.generateCss(mode, count));

		let shadowroot = this.attachShadow({ mode: "open" });
		shadowroot.adoptedStyleSheets = [sheet];

		let d = document.createElement("div");
		let text = this.getAttribute(Snow.attrs.text);
		d.innerText = text || "";
		for(let j = 0, k = count; j<k; j++) {
			shadowroot.appendChild(d.cloneNode(true));
		}

		shadowroot.appendChild(document.createElement("slot"));
	}
}

customElements.define("snow-fall", Snow);