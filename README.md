## H3js a simple template engine.



### Hello World

```javascript
var HelloWorld = new H3.Block(function(){

	this.elem('h1', {text:'Hello World!'});

}).build().render(document.body);
```
### Live Demos

Client Table: https://heronbeluci.github.io/H3/demo/client_table.html

