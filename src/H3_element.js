(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.DOMelem = function(tag, cfg){
		var dom = document.createElement(tag);

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
			dom.innerText = H3.lo.simpleParse(this, dom, cfg.text);
		}
		if(cfg.html){
			dom.innerHTML = H3.lo.simpleParse(this, dom, cfg.html, true);
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

		var id = this.elements.length+1;
		var elements = this.elements;
		elements[id] = {
			dom: dom,
			calls:{},
			call: function(name, data){
				if(data !== undefined){
					this.calls[name] = data;
				}else{
					this.tmpCall = this.calls[name];
					this.tmpCall();
					delete this.tmpCall;
				}
			},
			event: function(name, call){
				elements[id].call(name, call);
				this.dom.addEventListener(name, function(){
					elements[id].call(name);
				});
				return this;
			},
			value:    function(val){
				if(val){
					this.dom.value = val;
					return this;
				}else{
					return this.dom.value;
				}
			},
			css:      function(val){
				if(val){
					this.dom.className = val;
					return this;
				}else{
					return this.dom.className;
				}
			},
			data:     function(name, val){
				if(val){
					this.dom.dataset[name] = val;
					return this;
				}else{
					return this.dom.dataset[name];
				}
			},
			style:    function(name, val){
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

})();