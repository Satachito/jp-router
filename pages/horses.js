import horseDB from './horseDB.js'

export default class
Horses extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<h1>Horses</h1>
			<ul>
				${ horseDB.map( ( $, _ ) => `<li route=/horse/${ _ }>${ JSON.stringify( $ ) }</li>` ).join( '' ) }
			</ul>
		`
	}
}

customElements.define( 'jp-horses', Horses )

