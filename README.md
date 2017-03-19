## H3js a simple template engine.



### Hello World

```javascript
var HelloWorld = new H3.Block(function(){ // Creating a block

	this.elem('h1', {text:'Hello World!'});

})//.build().render(document.body); u can do this or

HelloWorld.build(); // Building the block content
HelloWorld.render(document.body); // Rendering the block content
```
### Live Demos

Client Table: https://heronbeluci.github.io/H3/demo/client_table.html

