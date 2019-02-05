import { testCounterStyles } from './test-counter-styles.js';
import { testCounterHTML } from './test-counter-html.js';
class TestCounter extends HTMLElement {

	static get style() {
		const style = document.createElement('style');
		style.textContent = testCounterStyles;
		return style;
	}
	static get template() {
		const template = document.createElement('template');
		template.innerHTML = testCounterHTML;
		template.content.appendChild(this.style);
		return template;
	}

	constructor() {
		super();
		this._attachShadow();
		this._bindFunctions();
		this._queryElement();
		this._initialize();
	}

	connectedCallback() {
		this._colorPicker.addEventListener('input', this.changeColor);
		this._decrementPropertyButton.addEventListener('click', this.decrementProperty);
		this._incrementPropertyButton.addEventListener('click', this.incrementProperty);
		this._decrementAttributeButton.addEventListener('click', this.decrementAttribute);
		this._incrementAttributeButton.addEventListener('click', this.incrementAttribute);
		this._xCounter.addEventListener('count-changed', this._countChanged);
	}

	disconnectedCallback() {
		this._colorPicker.removeEventListener('input', this.changeColor);
		this._decrementPropertyButton.removeEventListener('click', this.decrementProperty);
		this._incrementPropertyButton.removeEventListener('click', this.incrementProperty);
		this._decrementAttributeButton.removeEventListener('click', this.decrementAttribute);
		this._incrementAttributeButton.removeEventListener('click', this.incrementAttribute);
		this._xCounter.removeEventListener('count-changed', this._countChanged);
	}

	_attachShadow() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const instance = this.constructor.template.content.cloneNode(true);
		shadowRoot.appendChild(instance);
	}

	_bindFunctions() {
		this.changeColor = this.changeColor.bind(this);
		this.incrementProperty = this.incrementProperty.bind(this);
		this.decrementProperty = this.decrementProperty.bind(this);
		this.incrementAttribute = this.incrementAttribute.bind(this);
		this.decrementAttribute = this.decrementAttribute.bind(this);
		this._countChanged = this._countChanged.bind(this);
	}

	_queryElement() {
		this._xCounter = this.querySelector('x-counter');
		this._colorPicker = this.shadowRoot.querySelector('#colorPicker');
		this._decrementPropertyButton = this.shadowRoot.querySelector('#decrementProperty');
		this._incrementPropertyButton = this.shadowRoot.querySelector('#incrementProperty');
		this._decrementAttributeButton = this.shadowRoot.querySelector('#decrementAttribute');
		this._incrementAttributeButton = this.shadowRoot.querySelector('#incrementAttribute');
		this._logger = this.shadowRoot.querySelector('#logger');
	}

	_initialize() {
		let rootStyle = getComputedStyle(this);
		this._colorPicker.querySelectorAll('input').forEach((elem) => {
				elem.value = rootStyle.getPropertyValue(`--${elem.id}`).trim();
		});
	}

	_countChanged(e) {
		const item = document.createElement('dd');
		item.textContent = `Got event --> count = ${event.detail.count}`;
		this._logger.appendChild(item);
	}

	changeColor(event) {
		this.style.setProperty(`--${event.target.id}`, event.target.value);
	}

	incrementProperty() {
		this._xCounter.count++;
	}

	decrementProperty() {
		this._xCounter.count--;
	}

	incrementAttribute() {
		this._xCounter.setAttribute('count', ++this._xCounter.count);
	}

	decrementAttribute() {
		this._xCounter.setAttribute('count', --this._xCounter.count);
	}
}

window.customElements.define('tester-counter', TestCounter);
