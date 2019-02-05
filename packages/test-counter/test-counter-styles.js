export const testCounterStyles = `
:host {
	display: block;
	--button-background-color: #000000;
	--button-color: #FFFFFF;
	width: 20em;
}
.original, .tester {
	padding: 1em;
	border: 1px solid black;
	margin-bottom: 1em;
}

.test {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1em;
}
button {
	width: 3em;
	height: 3em;
	background: var(--button-background-color);
	color: var(--button-color);
	border: 0 none;
	border-radius: 50%;
}
span {
	flex-grow: 1;
	text-align: center;
	line-height: 2em;
}

dl, dt, dd {
	margin: 0;
	padding: 0;
}
`;
