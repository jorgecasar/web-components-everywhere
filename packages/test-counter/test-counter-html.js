export const testCounterHTML = `
<div class="original">
	<slot></slot>
</div>
<div class="tester">
	<div class="test" id="colorPicker">
		<input type="color" id="button-background-color" />
		<span>CSS Custom properties</span>
		<input type="color" id="button-color" />
	</div>
	<div class="test">
		<button id="decrementProperty">-</button>
		<span>Set property</span>
		<button id="incrementProperty">+</button>
	</div>
	<div class="test">
		<button id="decrementAttribute">-</button>
		<span>Set attribute</span>
		<button id="incrementAttribute">+</button>
	</div>
	<dl id="logger">
		<dt>Listen 'count-changed' event</dt>
	</dl>
<div>
`;
