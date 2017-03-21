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
 *      V0.17a (2017-03-21)
 *
 */

H3 = (function(){
	var handlers={};
	var blocks={};

	var cacheName = function(str) {
		str = encodeURI(str);
		var a = 1, b = 0, L = str.length, M = 0, c = 0, d = 0;
		if(typeof seed === 'number') { a = seed & 0xFFFF; b = seed >>> 16; }
		for(var i = 0; i < L;) {
			M = Math.min(L-i, 3850);
			while(M>0) {
				c = str.charCodeAt(i++);
				if(c < 0x80) { a += c; }
				else if(c < 0x800) {
					a += 192|((c>>6)&31);             b += a; --M;
					a += 128|(c&63);
				} else if(c >= 0xD800 && c < 0xE000) {
					c = (c&1023)+64; d = str.charCodeAt(i++) & 1023;
					a += 240|((c>>8)&7);              b += a; --M;
					a += 128|((c>>2)&63);             b += a; --M;
					a += 128|((d>>6)&15)|((c&3)<<4);  b += a; --M;
					a += 128|(d&63);
				} else {
					a += 224|((c>>12)&15);            b += a; --M;
					a += 128|((c>>6)&63);             b += a; --M;
					a += 128|(c&63);
				}
				b += a; --M;
			}
			a = (15*(a>>>16)+(a&65535));
			b = (15*(b>>>16)+(b&65535));
		}
		return ((b%65521) << 16) | (a%65521);
	}

	var domElement = function(tag, cfg){

		if(this.advCache === true && cfg.dyn !== true && this.staCache !== true){

			

			return false;
		}
		
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
		if(cfg.style !== undefined){
			for(var key in cfg.style){
				element.style[key] = cfg.style[key];
			}
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
		if(cfg.title !== undefined){
			element.title = cfg.title;
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
			onChange: function(call){
				elements[_id].clickCall = call;
				element.addEventListener("change", function(){
					elements[_id].clickCall();
				});
				return this;
			},
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
			onOut: function(call){
				elements[_id].clickCall = call;
				element.addEventListener("mouseout", function(){
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
			},
			style: function(name, val){
				if(val === undefined){
					return this.dom.style[name];
				}else{
					this.dom.style[name] = val;
					return this;
				}
			}
		}

		this.elements[_id] = {
			dom:       element,
			onClick:   events.onClick,
			onChange:  events.onChange,
			onOver:    events.onOver,
			onOut:     events.onOut,
			value:     events.value,
			data:      events.data,
			css:       events.css,
			style:     events.style
		}

		return this.elements[_id];
	}

	handlers.Block = function(trunk){
		this.id = '_'+Math.random().toString(36).substr(2, 12);
		this.trunk = trunk;
		this.elements={};
		blocks[this.id] = this;
		return this;
	}
	handlers.Block.prototype.cache = function(static){
		this.advCache = true;
		this.staCache = static;
		return this;
	}
	handlers.Block.prototype.build = function(){
		//localStorage.clear(); // Clear Cache

		
		if(this.advCache === true && this.staCache === true){
			console.log('Storage: ', localStorage);
			var cacheContent = localStorage.getItem('_H3-CS.'+cacheName(this.trunk));
			if(cacheContent){
				this.dom = document.createElement('h3-block');
				this.dom.id = this.id;
				this.dom.innerHTML = cacheContent;
				return this;
			}
		}

		this.dom = document.createElement('h3-block');
		this.dom.id = this.id;
		this.elem = domElement;
		this.trunk(this);

		if(this.advCache === true && this.staCache === true){
			localStorage.setItem('_H3-CS.'+cacheName(this.trunk), this.dom.childNodes[0].outerHTML);
		}
		
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