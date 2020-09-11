# jp-router

A small and understandable WebComponets router which supports:

* Lazy loading
* Direct html
* Tag base creation

## Install

```
npm install @satachito/jp-router --save
```

## Demo

Our demo contains various patter including illegal patterns i.e. 404 and multiple routing.

see https://satachito.github.io/jp-router/

## Write HTML and JavaScript

### index.html
```
<!DOCTYPE html>
<html lang=zxx>
<meta charset="utf-8" />
<title>Router</title>

<script type=module>
	class
	Home extends HTMLElement {
		connectedCallback() {
			this.innerHTML = '<h1>Home</h1>'
		}
	}
	customElements.define( 'jp-home', Home )
</script>

<nav class=nav>
	<ul>
		<li route=/				>Home			</li>
		<li route=/direct		>Direct HTML	</li>
		<li route=/horses		>Horses			</li>
	</ul>
</nav>

<jp-route
	path=/
	title=Home
	data=jp-home
	spec=tag
></jp-route>

<jp-route
	path=/direct
	title="Direct html"
	data="<b>DIRECT HTML</b>"
	spec=html
></jp-route>

<jp-route
	path=/horses
	title=Horses
	data=/horses.js
	spec=source
></jp-route>

<jp-route
	path=/horse/:id
	title="Horse Details"
	data=/horse.js
	spec=source
></jp-route>

<script type=module src=./node_modules/@satachito/jp-router/jp-router.js></script>
<jp-router></jp-router>
```

### horseDB.js

```
export default [
	[ 'Narita Brian'	, 19910503 ]
,	[ 'Deep Impact'		, 20020325 ]
,	[ 'Orfevre'			, 20080514 ]
]
```

### horses.js
```
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
```

### horse.js

```
import horseDB from './horseDB.js'

export default class
Horse extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<h1>Horse Details</h1>
			<div>${ JSON.stringify( horseDB[ this.getAttribute( 'id' ) ] ) }</div>
		`
	}
}

customElements.define( 'jp-horse', Horse )
```

### Serve

```
npm install -g http-server
http-server
```

