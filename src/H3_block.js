(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.Block = function(trunk){
		this.id = new Date().getTime()+Math.random();
		this.trunk = trunk;
		this.elements=[];

		this.destroy = function(){
			if(this.dom !== undefined) this.dom.remove();
			delete this.dom;
			delete this.elem;
			delete this.elements;
			delete this.id;
			delete this.trunk;
			delete this.destroy;
		}

		return this;
	}
	H3.Block.prototype.update = function(object){
		
		for(var key in this.elements){
			var elem = this.elements[key];
			var dom  = elem.dom;

			if(dom.useData){
				var newParser = H3.lo.templateParser(this.dataObject, elem.template, elem);
				if(dom.isHtml){
					if(dom.innerText != newParser){
						dom.innerText = newParser;
					}
				}else{
					if(dom.innerHTML != newParser){
						dom.innerHTML = newParser;
					}
				}				
			}
		}

		return this;
	}
	H3.Block.prototype.data = function(object){
		this.dataObject = object;

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
		if(this.dom === undefined){
			console.error('H3: Tried to renderize a unbuilded block.');
			return false;
		}
		dest.appendChild(this.dom);
		return this;
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
	H3.Block.prototype.html = function(){
		if(this.dom === undefined) console.error('H3: Tried to get html from a unbuilded block.');
		return this.dom;
	}
})();