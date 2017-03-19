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
__Elements are placed only under a especific block__
```js

	this.elem('h1', {text:'Hello World!'});
```

#### Element Config
```json
{
	
}
```
