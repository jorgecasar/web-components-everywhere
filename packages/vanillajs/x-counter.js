const countSymbol = Symbol('count');

class XCounter extends HTMLElement {

	static get observedAttributes() {
		return ['count'];
	}
	static get style() {
		const style = document.createElement('style');
		style.textContent = `
		:host {
			display: flex;
			justify-content: space-between;
			align-items: stretch;
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
		`;
		return style;
	}

	static get template() {
		const template = document.createElement('template');
		template.innerHTML = `
		<button id="decrement">-</button>
		<span id="count"></span>
		<button id="increment">+</button>
		`;
		template.content.appendChild(this.style);
		return template;
	}

	get count() {
		return this[countSymbol];
	}

	set count(value) {
		this[countSymbol] = parseInt(value);
		this._countElement.textContent = value;
	}

	constructor() {
		super();
		this._attachShadow();
		this._bindFunctions();
		this._queryElement();
		this._initProperties();
	}

	connectedCallback() {
		this._decrementButton.addEventListener('click', this.decrement);
		this._incrementButton.addEventListener('click', this.increment);
	}

	disconnectedCallback() {
		this._decrementButton.removeEventListener('click', this.decrement);
		this._incrementButton.removeEventListener('click', this.increment);
	}

	_attachShadow() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const instance = this.constructor.template.content.cloneNode(true);
		shadowRoot.appendChild(instance);
	}

	_bindFunctions() {
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	_queryElement() {
		this._countElement = this.shadowRoot.querySelector('#count');
		this._decrementButton = this.shadowRoot.querySelector('#decrement');
		this._incrementButton = this.shadowRoot.querySelector('#increment');
	}

	_initProperties() {
		this.count = 0;
	}

	increment() {
		this.count++;
		this._nofifyCountChanged();
	}

	decrement() {
		this.count--;
		this._nofifyCountChanged();
	}

	_nofifyCountChanged() {
		const event = new CustomEvent('count-changed', {
			detail: {
				count: this.count
			}
		});
		this.dispatchEvent(event);
	}
}

window.customElements.define('x-counter', XCounter);
