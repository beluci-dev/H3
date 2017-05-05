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

	// H3 Element
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
		if(cfg.text)          dom.innerText    = H3.DataParser(this.data, dom, cfg.text);
		if(cfg.html)          dom.innerHTML    = H3.DataParser(this.data, dom, cfg.html, true);

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
			text:cfg.text,
			html:cfg.html,

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

	// H3 Block
	H3.Block = function(trunk){
		this.id = new Date().getTime()+Math.random();
		this.trunk = trunk;
		this.elements=[];
		//blocks[this.id] = this;
		return this;
	}
	H3.Block.prototype.build   = function(data){
		this.dom    = document.createElement('h3-block');
		this.data = data;
		this.dom.id = this.id;
		this.elem   = H3.DOMelem;
		this.trunk(this);
		return this;
	}
	H3.Block.prototype.render  = function(dest){
		if(this.dom === undefined) throw('H3: Tried to renderize a unbuilded block.');
		dest.appendChild(this.dom);
		return this;
	}
	H3.Block.prototype.html    = function(){
		if(this.dom === undefined) throw('H3: Tried to get html from a unbuilded block.');
		return this.dom;
	}
	H3.Block.prototype.destroy = function(){
		if(this.dom !== undefined){
			this.dom.remove();
		}		

		delete this.data;
		delete this.trunk;
		delete this.render;
		delete this.elem;
		delete this.dom;

		return this;
	}

	// H3 LiveObjects
	H3.Block.prototype.refresh = function(){
		for(var key in this.elements){
			var dom = this.elements[key].dom;

			if(dom.H3dt === 'html'){
				var res = H3.DataParser(this.data, dom, dom.H3tp, true);
				if(dom.innerHTML !== res){
					dom.innerHTML = res;
				}
			}
			if(dom.H3dt === 'text'){
				var res = H3.DataParser(this.data, dom, dom.H3tp);
				if(dom.innerText !== res){
					dom.innerText = res;
				}
			}
		}
	}
	H3.DataParser = function(data, dom, str, html){
		if(!data || str==undefined) return str;

		// Making a shallow copy and replacing the {{ }} with the data
		return str.substr(0).replace(/{{(.*?)}}/g, function(match, key){

			if(match){
				if(html){
					dom.H3dt = 'html';
				}else{
					dom.H3dt = 'text';
				}
				dom.H3tp = str;
			}

			if(data[key]){
				return data[key];
			}else{
				var map = key.split(".");



			}

		});
	}

})();
