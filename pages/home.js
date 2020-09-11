customElements.define(
	'jp-home'
,	class extends HTMLElement {
		connectedCallback() {
			this.innerHTML = '<h1>Welcome to my home!</h1>'
		}
	}
)

