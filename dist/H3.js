/*
 *       __   __  _______
 *      |  | |  ||___    |
 *      |  |_|  | ___|   |    __   _____
 *      |   _   ||___    |   |  | |  ___|
 *      |  | |  | ___|   | __|  | |___  |
 *      |__| |__||_______||_____| |_____|
 *
 *      https://github.com/Heronbeluci/H3
 * 
 *      V0.2 (2017-03-22)
 *
 */

H3 = (function(){
	let handlers = {};
	let blocks   = {};

	let H3Element = function(tag, cfg){
		let dom = document.createElement(tag);

		// Properties
		if(cfg.id){
			dom.id = cfg.id;
		}
		if(cfg.css){
			dom.className = cfg.css;
		}
		if(cfg.style){
			for(var key in cfg.style){
				dom.style[key] = cfg.style[key];
			}
		}

		// Content
		if(cfg.text){
			dom.innerText = cfg.text;
		}
		if(cfg.html){
			dom.innerHTML = cfg.html;
		}
		if(cfg.value){
			dom.value = cfg.value;
		}
		if(cfg.holder){
			dom.placeholder = cfg.holder;
		}
		if(cfg.title){
			dom.title = cfg.title;
		}

		// Data
		if(cfg.data){
			dom.dataset = cfg.data;
		}

		let id = this.elements.length+1;

		this.elements[id] = {
			dom: dom,

			onClick:  function(call){
				elements[id].clickCall = call;
				element.addEventListener('click', function(){
					elements[id].clickCall();
				});
				return this;
			},
			onOver:   function(call){
				elements[id].overCall = call;
				element.addEventListener('mouseover', function(){
					elements[id].overCall();
				});
				return this;
			},
			onOut:    function(call){
				elements[id].outCall = call;
				element.addEventListener('mouseout', function(){
					elements[id].outCall();
				});
				return this;
			},
			value:    function(val){
				if(val){
					return this.dom.value;
				}else{
					this.dom.value = val;
					return this;
				}
			},
			css:      function(val){
				if(val){
					return this.dom.className;
				}else{
					this.dom.className = val;
					return this;
				}
			},
			data:     function(name, val){
				if(val){
					return this.dom.dataset[name];
				}else{
					this.dom.dataset[name] = val;
					return this;
				}
			},
			style:    function(name, val){
				if(val){
					return this.dom.style[name];
				}else{
					this.dom.style[name] = val;
					return this;
				}
			}
		}

		// Place element on destiny
		if(cfg.dest){
			cfg.dest.dom.appendChild(dom);
		}else{
			this.dom.appendChild(dom);
		}

		return this.elements[id];

	}

	handlers.Block = function(trunk){
		this.id = new Date().getTime()+Math.random();
		this.trunk = trunk;
		this.elements=[];
		blocks[this.id] = this;
		return this;
	}
	handlers.Block.prototype.build = function(){
		this.dom    = document.createElement('h3-block');
		this.dom.id = this.id;
		this.elem   = H3Element;
		this.trunk(this);
		return this;
	}
	handlers.Block.prototype.render = function(dest){
		if(this.dom === undefined) console.error('H3: Tried to renderize a unbuilded block.');
		dest.appendChild(this.dom);
		return this;
	}
	handlers.Block.prototype.html = function(){
		if(this.dom === undefined) console.error('H3: Tried to get html from a unbuilded block.');
		return this.dom;
	}

	return handlers;
})();
