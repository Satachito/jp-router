import { horseDB } from './horseDB.js'

export default class
Horse extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class='page'>
				<h1>Horse Details</h1>
				<div>${ JSON.stringify( horseDB[ this.getAttribute( 'id' ) ] ) }</div>
			</div>
		`
	}
}

customElements.define( 'jp-horse', Horse )
