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

	var templateParser = function(key, val, str){

		str = str.replace(/{{(.*?)}}/, function(match, key) {
			return val;
		});

		return str;
	}

	H3.lo.simpleParse = function(block, str, dom, html){
		if(!block.dataObject) return str;
		
		var data = block.dataObject;

		onPropertyChange(data, function(dat, key){
			console.log(templateParser(dat, key, str));
		});

		//return templateParser(str, data, dom);
	}

})();