(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.lo = {
		storage:{}
	};

	var haveDiff = function(dom, str, html){
		if(html){
			return dom.innerHTML !== str;
		}else{
			return dom.innerText !== str;
		}
	}

	var templateParser = function(template, data, dom){
		for(var key in data){
			src = src.replace(/{{(.*?)}}/, function(match, key) {
				return data[key];
			});
		}

		return src;
	}

	H3.lo.simpleParse = function(block, dom, str, html){
		if(!data) return str;
		
		for(var key in data){
			Object.defineProperty(data, key, {
			    get:function(){
			    	return localData[key];
			    },
			    set:function(val){
			    	localData[key] = val;
			    	console.log(templateParser(str, data, dom));
			    }
			});
		}
		/*
		
		for(var key in data){
			var val = data[key];
			Object.defineProperty(data, key, {
				get: function(){
					return val;
				},
				set: function(newval){
					val = newval
					console.log(templateParser(str, data, dom));
					return val;
				}
			});
		}
		*/

		return templateParser(str, localData, dom);
	}


})();