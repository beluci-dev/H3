# H3js a simple client side template engine.
_V0.3a (2017-05-08)_<br>
### Preview

```js
var HelloWorld = new H3.Block(function(){ // Creating the block

	this.elem('h1', {text:'Hello World!'}); // Defining the element

});

HelloWorld.build(); // Building the block
HelloWorld.render(document.body); // Rendering the block
```
### Live Demos

Hello World: https://heronbeluci.github.io/H3/demo/hello_world.html<br>
Client Table: https://heronbeluci.github.io/H3/demo/client_table.html<br>
Event List: https://heronbeluci.github.io/H3/demo/event_list.html<br>
LiveObjects: https://heronbeluci.github.io/H3/demo/live_objects.html

### Benchmark
JSFiddle: https://jsfiddle.net/sfkk4rrw/1/

## Documentation

### Block
*A block is needed to cluster the elements.*

##### Block Layout Types

#1 Default
```js
var main = new H3.Block(function(){ // Creating the block

	this.elem('h1', {text:'Just a element'}); // Defining the element

});

main.build(); // Building the block
main.render(document.body); // Rendering the block
```
#2 Detached
```js
var main = new H3.Block();

// Set the trunk function
main.trunk = function(){
	this.elem('h1', {text:'Just a element'}); // Defining the element
}

main.build(); // Building the block
main.render(document.body); // Rendering the block
```

#2 Compact
```js
var main = new H3.Block(function(){

	this.elem('h1', {text:'Just a element'}); // Defining the element
	
}).build().render(document.body); // Rendering the block
```

##### Block Handlers
```js
block.build(data);                 // Constructs all elements inside the block simultaneously
block.render(destiny, callback);   // Render a builded block inside a DOM element
block.html();                      // Gets the DOM element from a builded block
block.destroy();                   // Destroy a block and all child elements
block.refresh();                   // Compare the two data (Virtual and DOM) and display the most updated
```
### LiveObjects
*LiveObjects can be used in html or text elements, are used to replace syntaxes with values all in real time, with refreshes.*

##### How to use
First you need to build a data object or array
```js
var data = {name:'Heisenberg'} // You can do this (You will call in the element {{name}})
var data = ['Heisenberg'];     // Or you can do this too (You will call in the element {{0}})
```

After you need to set the data in your block
```js
block.build(data); // You can use this
block.data = data; // Or you can use this too
```

Now you can set the sysntax under the element (html or text)
```js
this.elem('div', {text:'Say my name!'});
this.elem('div', {html:'Your name is <b>{{name}}</b>'});
```
##### How to update/refresh the data
To refresh the data you need to call the handler below (after edited the data)
```js
block.refresh();
```

### Element
*Elements are placed only under a especific block*
```js
this.elem(tag, attributes);
```
##### Element Tags
Is the same than default DOM (div, span, button, h1, h2, h3...)<br>
Complete default element list: https://developer.mozilla.org/en-US/docs/Web/HTML/Element<br>
You can use custom elements too, with a exception: `H3-Block` are used by H3.

##### Element Attributes

HTML Default attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list<br>
Obs. Not all attributes are present, but we are working on this.

H3 Custom Attributes
```js
{
	dest:'',   // Destiny to display a element (if null the element have the block with destiny)
	text:'',   // [LiveObjects Works Here] Text to display under a element
	html:'',   // [LiveObjects Works Here] HTML to display under a element (like text but can render html syntaxes)
	data:{},   // Object to save data in the DOM element
	style:{}   // Custom style for each element
}
```


##### Element Events
```js
element.event('eventName', callbackFunction);
```
DOM events list: https://www.w3schools.com/tags/ref_eventattributes.asp

##### Element Handlers
```js
element.value();        // Used to get value or element.value('10') to set value
element.data('name')    // Used to get data or element.data('name', 'value') to set data
element.class()         // Used to get class or element.css('class') to rewrite the class
element.style('name')   // Used to get style or element.style('name', 'value') to change the style
element.attr('name')    // Used to get an attribute or element.attr('name', 'value') to change the attribute
```
**TIP:** *You can use element.dom to access the dom element, like ```element.dom.remove()``` or ```element.dom.setAttribute()```*
