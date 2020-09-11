import { horseDB } from './horseDB.js'

export default class
Horses extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div>
				<h1>Horses</h1>
				<ul>
					${ Object.entries( horseDB ).map( _ => `<li route=/horse/${ _[ 0 ] }>${ JSON.stringify( _[ 1 ] ) }</li>` ).join( '' ) }
				</ul>
			</div>
		`
	}
}

customElements.define( 'jp-horses', Horses )

