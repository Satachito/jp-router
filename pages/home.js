export default class
Home extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '<div><h1>Home</h1></div>'
	}
}

customElements.define( 'jp-home', Home )
