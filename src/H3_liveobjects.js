function onPropertyChange(o, callback){
    for(var p in o){
        if(o.hasOwnProperty(p)){
            var originalVal = o[p];
            Object.defineProperty(o, p, {
               get: function(){
                   return originalVal;
               },
               set: function(val){
                   callback.call(o, p, val);
                   return originalVal = val;
               }
            });
        }
    }
}

(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.lo = {
		storage:{}
	};

	var templateParser = function(src, data, dom){
		for(var key in data){
			src = src.replace(/{{(.*?)}}/, function(match, key) {
				return data[key];
			});
		}

		return src;
	}

	H3.lo.simpleParse = function(block, dom, str, html){
		if(!block.dataObject) return str;
			
		var data = block.dataObject;

		onPropertyChange(data, function(dat, key, val){
			console.log(templateParser(str, data, dom));
		});

		return templateParser(str, data, dom);
	}


})();