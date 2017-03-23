(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.Block = function(trunk){
		this.id = new Date().getTime()+Math.random();
		this.trunk = trunk;
		this.elements=[];
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
})();