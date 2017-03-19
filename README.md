## H3js a simple template engine.



### Hello World

```js
var HelloWorld = new H3.Block(function(){ // Creating a block

	this.elem('h1', {text:'Hello World!'});

});

HelloWorld.build(); // Building the block template
HelloWorld.render(document.body); // Rendering the block
```
### Live Demos

Client Table: https://heronbeluci.github.io/H3/demo/client_table.html

### Documentation

#### Element
*Elements are placed only under a especific block*
```js
this.elem(tag, config);
```

#### Element Config
```json
{
	dest:'', // Destiny to display a element
	id:'',   // ID to set in the DOM
	css:'',  // ClassName of the element (on native DOM is ´class´)
	text:'',
	html:'',
	value:'',
	holder:''
}
```
