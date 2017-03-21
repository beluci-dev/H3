## H3js a simple client side template engine.
_V0.17a (2017-03-21)_

### Planned Features

| Status  | Description |
| ------- | ----------- |
| Done    | Easy element implementation              |
| Done    | Dynamic block build                      |
| Done    | Dynamic block render                     |
| Soon    | Advanced Cache System (Block by Block)   |
| Soon    | Dynamic memory alocation (Configurable)  |

### Hello World

```js
var HelloWorld = new H3.Block(function(){ // Creating a block

	this.elem('h1', {text:'Hello World!'});

});

HelloWorld.build(); // Building the block
HelloWorld.render(document.body); // Rendering the block
```
### Live Demos

Hello World: https://heronbeluci.github.io/H3/demo/hello_world.html<br>
Client Table: https://heronbeluci.github.io/H3/demo/client_table.html<br>
Event List: https://heronbeluci.github.io/H3/demo/event_list.html

### Benchmark
JSFiddle: https://jsfiddle.net/sfkk4rrw/1/

### Documentation

#### Element
*Elements are placed only under a especific block*
```js
this.elem(tag, config);
```
#### Element Tags
Is the same than default DOM (div, span, button, h1, h2, h3...)<br>
Complete default element list: https://developer.mozilla.org/en-US/docs/Web/HTML/Element<br>
You can use custom elements too, with a exception: `H3-Block` are used by H3.

#### Element Config
```js
{
	dest:'',   // Destiny to display a element (if null the element have the block with destiny)
	id:'',     // ID to set in the DOM
	css:'',    // ClassName of the element (on native DOM is ´class´)
	text:'',   // Text to display under a element
	html:'',   // HTML to display under a element (like text but can render html syntaxes)
	value:'',  // Value of the element (Usually used in inputs)
	holder:'', // Placeholder of the element (Usually used in inputs)
	data:{},   // Object to save data in the DOM element
	style:{}   // Custom style for each element
}
```

#### Element Events
```js
element.onClick(function(){});  // Called when the mouse clicked in the element
element.onOver(function(){});   // Called when the mouse over the element
element.onOut(function(){});    // Called when the mouse out the element
element.onChange(function(){}); // Called when the value change
element.value();                // Used to get value or element.value('10') to set value
element.data('name')            // Used to get data or element.data('name', 'value') to set data
element.css()                   // Used to get class or element.css('class') to rewrite the class
element.style('name')           // Used to get style or element.style('name', 'value') to change the style
```

