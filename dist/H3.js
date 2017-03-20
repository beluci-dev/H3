H3 = (function(){
	var handlers={};
	var blocks={};

	var domElement = function(tag, cfg){
		var element = document.createElement(tag);
		var _id = '_'+Math.random().toString(36).substr(2, 12);
		var elements = this.elements;

		// Properties
		if(cfg.id !== undefined){
			element.id = cfg.id;
		}
		if(cfg.css !== undefined){
			element.className = cfg.css;
		}

		// Content
		if(cfg.text !== undefined){
			element.innerText = cfg.text;
		}
		if(cfg.html !== undefined){
			element.innerHTML = cfg.html;
		}
		if(cfg.value !== undefined){
			element.value = cfg.value;
		}
		if(cfg.holder !== undefined){
			element.placeholder = cfg.holder;
		}

		// Data
		if(cfg.data !== undefined){
			for(var key in cfg.data){
				element.dataset[key] = cfg.data[key];
			}
		}

		// Place element on destiny
		if(cfg.dest !== undefined){
			if(cfg.dest.dom !== undefined) 
				cfg.dest.dom.appendChild(element);
			else
				cfg.dest.appendChild(element);
		}else{
			this.dom.appendChild(element);
		}

		var events = {
			onClick: function(call){
				elements[_id].clickCall = call;
				element.addEventListener("click", function(){
					elements[_id].clickCall();
				});
				return this;
			},
			onOver: function(call){
				elements[_id].clickCall = call;
				element.addEventListener("mouseover", function(){
					elements[_id].clickCall();
				});
				return this;
			},
			value: function(val){
				if(val === undefined){
					return this.dom.value;
				}else{
					this.dom.value = val;
					return this;
				}
			},
			css: function(val){
				if(val === undefined){
					return this.dom.className;
				}else{
					this.dom.className = val;
					return this;
				}
			},
			data: function(name, val){
				if(val === undefined){
					return this.dom.dataset[name];
				}else{
					this.dom.dataset[name] = val;
					return this;
				}
			}
		}

		this.elements[_id] = {
			dom: element,
			onClick: events.onClick,
			onOver: events.onOver,
			value: events.value,
			data: events.data,
			css: events.css
		}

		return this.elements[_id];
		//console.log(tag, config);
	}

	handlers.Block = function(trunk){
		this.id = '_'+Math.random().toString(36).substr(2, 12);
		this.trunk = trunk;
		this.elements={};
		blocks[this.id] = this;
		return this;
	}
	handlers.Block.prototype.build = function(){

		this.dom = document.createElement('h3-block');
		this.dom.id = this.id;

		// Adding trunk attributes
		this.elem = domElement;



		this.trunk(this);
		return this;
	}
	handlers.Block.prototype.render = function(dest){
		if(this.dom === undefined) console.error('H3: Tried to renderize a unbuilded block.');
		dest.appendChild(this.dom);
		return this;
	}

	return handlers;
})();