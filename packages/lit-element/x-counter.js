import { LitElement, html, css } from 'lit-element';

class XCounter extends LitElement {

	static get properties() {
		return {
			count: { type: Number }
		};
	}
	static get styles() {
		return css`
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
	}

	render() {
		return html`
		<button @click="${this.decrement}">-</button>
		<span id="count">${this.count}</span>
		<button @click="${this.increment}">+</button>
		`;
	}

	constructor() {
		super();
		this._initProperties();
	}

	_initProperties() {
		this.count = 0;
	}

	increment() {
		this.count++;
		this._notifyCountChange();
	}

	decrement() {
		this.count--;
		this._notifyCountChange();
	}

	_notifyCountChange() {
		const event = new CustomEvent('count-changed', {
			detail: {
				count: this.count
			}
		});
		this.dispatchEvent(event);
	}
}

window.customElements.define('x-counter', XCounter);
