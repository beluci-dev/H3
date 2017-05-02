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
 *      V0.21a (2017-03-22)
 *
 */
(function(){
	H3 = {};

	H3.DOMelem = function(tag, cfg){
		var dom = document.createElement(tag);

		// Properties
		if(cfg.id)            dom.id           = cfg.id;
		if(cfg.class)         dom.className    = cfg.class;
		if(cfg.src)           dom.src          = cfg.src;
		if(cfg.type)          dom.type         = cfg.type;
		if(cfg.href)          dom.href         = cfg.href;
		if(cfg.value)         dom.value        = cfg.value;
		if(cfg.placeholder)   dom.placeholder  = cfg.placeholder;
		if(cfg.title)         dom.title        = cfg.title;
		if(cfg.for)           dom.htmlFor      = cfg.for;

		// Content
		if(cfg.text)          dom.innerText    = cfg.text;
		if(cfg.html)          dom.innerHTML    = cfg.html;

		// Data
		if(cfg.data){
			for(var i in cfg.data){
				dom.dataset[i] = cfg.data[i];
			}
		}
		
		// Style
		if(cfg.style){
			for(var i in cfg.style){
				dom.style[i] = cfg.style[i];
			}
		}

		var id = this.elements.length+1;
		var elements = this.elements;
		elements[id] = {
			dom: dom,
			calls:{},
			call:  function(name, data, result){
				if(data !== null){
					this.calls[name] = data;
				}else{
					this.tmpCall = this.calls[name];
					this.tmpCall(result);
					delete this.tmpCall;
				}
			},
			event: function(name, call){
				elements[id].call(name, call);
				this.dom.addEventListener(name, function(e){
					elements[id].call(name, null, e);
				});
				return this;
			},

			// Actions
			value: function(val){
				if(val){
					this.dom.value = val;
					return this;
				}else{
					return this.dom.value;
				}
			},
			class: function(val){
				if(val){
					this.dom.className = val;
					return this;
				}else{
					return this.dom.className;
				}
			},
			attr:  function(name, val){
				if(val){
					this.dom.setAttribute(name, val);
					return this;
				}else{
					return this.dom.getAttribute(name);
				}
			},
			data:  function(name, val){
				if(val){
					this.dom.dataset[name] = val;
					return this;
				}else{
					return this.dom.dataset[name];
				}
			},
			style: function(name, val){
				if(val){
					this.dom.style[name] = val;
					return this;
				}else{
					return this.dom.style[name];
				}
			}
		}

		// Place element on destiny
		if(cfg.dest){
			cfg.dest.dom.appendChild(dom);
		}else{
			this.dom.appendChild(dom);
		}

		return elements[id];
	}

	H3.Block = function(trunk){
		this.id = new Date().getTime()+Math.random();
		this.trunk = trunk;
		this.elements=[];
		//blocks[this.id] = this;
		return this;
	}
	H3.Block.prototype.build = function(){
		this.dom    = document.createElement('h3-block');
		this.dom.id = this.id;
		this.elem   = H3.DOMelem;
		this.trunk(this);
		return this;
	}
	H3.Block.prototype.render = function(dest){
		if(this.dom === undefined) console.error('H3: Tried to renderize a unbuilded block.');
		dest.appendChild(this.dom);
		return this;
	}
	H3.Block.prototype.html = function(){
		if(this.dom === undefined) console.error('H3: Tried to get html from a unbuilded block.');
		return this.dom;
	}
	H3.Block.prototype.destroy = function(){
		if(this.dom === undefined){
			console.error('H3: Tried to destroy a unbuilded block.');
			return false;
		}

		this.dom.remove();

		delete this.data;
		delete this.trunk;
		delete this.render;
		delete this.elem;
		delete this.dom;

		return this;
	}
})();
