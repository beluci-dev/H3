(function(){
	if(typeof H3 == 'undefined') H3 = {};

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
		if(cfg.data)          dom.dataset      = cfg.data;

		// Content
		if(cfg.text){
			dom.innerText = H3.lo.templateParser(this.dataObject, cfg.text, dom);
			dom.isHtml=false;
			var str = cfg.text;
		}
		if(cfg.html){
			dom.innerHTML = H3.lo.templateParser(this.dataObject, cfg.html, dom);
			dom.isHtml=true;
			var str = cfg.html;
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
			template:str,
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

})();