const
PathSegs = uri => uri.split( '/' ).filter( $ => $.length )

const
Key = $ => {
	const _ = /^:(.+)/.exec( $ )
	return _ ? _[ 1 ] : _
}

const
Match = ( route, data ) => {
	const rSegs = PathSegs( route )
	const dSegs = PathSegs( data )

	if ( rSegs.length != dSegs.length ) return null

	const _ = rSegs.flatMap( ( $, _ ) => $ == dSegs[ _ ] ? [] : [ [ Key( $ ), decodeURIComponent( dSegs[ _ ] ) ] ] )
	return _.every( $ => $[ 0 ] ) ? Object.fromEntries( _ ) : null
}

class
Router extends HTMLElement {

	connectedCallback() {
		this.UpdateLinks()
		window.onpopstate = ev => this.Navigate( location.pathname )
		window.onpopstate()
	}

	disconnectedCallback() {
		window.onpopstate = null
	}

	UpdateLinks() {
		document.querySelectorAll( '[route]' ).forEach(
			$ => $.onclick = ev => {
				const route = $.getAttribute( 'route' )
				this.Navigate( route )
				history.pushState( null, null, route )
			}
		)
	}

	Navigate( url ) {

		const routes = Array.from( document.querySelectorAll( 'jp-route' ) ).map(
			$ => (
				{	path	: $.getAttribute( 'path'	)
				,	title	: $.getAttribute( 'title'	)
				,	data	: $.getAttribute( 'data'	)
				,	spec	: $.getAttribute( 'spec'	)
				}
			)
		)
		routes.forEach( $ => $.params = Match( $.path, url.split( '?' )[ 0 ] ) )
		const _ = routes.filter( $ => $.params )

		switch ( _.length ) {
		case 1:
			{	const { path, title, data, spec, params } = _[ 0 ]

				while ( this.firstChild ) this.removeChild( this.firstChild )

				document.title = title || url

				const
				AttachView = view => {
					for ( let key in params ) view.setAttribute( key, params[ key ] )
					this.appendChild( view )
					this.UpdateLinks()
				}

				switch ( spec ) {
				case 'html':
					this.innerHTML = data
					AttachView( this.firstChild )
					break
				case 'tag':
					AttachView( document.createElement( data ) )
					break
				case 'source':
					import( data ).then( $ => AttachView( new $.default() ) )
					break
				}
			}
			break
		case 0:
			document.title = '404'
			this.innerHTML = '404 Page not found. URL: ' + url
			break
		default:
			document.title = 'MULTIPLE ROUTE'
			this.innerHTML = 'Internal logic error: MULTIPLE ROUTE, see console'
			console.error( 'MULTIPLE ROUTE', JSON.stringify( _ ) )
			break
		}
	}
}

customElements.define( 'jp-router', Router )
