function onPropertyChange(o, str, dom, callback){
    for(var p in o){
        if(o.hasOwnProperty(p)){
            let originalVal = o[p];
            Object.defineProperty(o, p, {
               get: function(){
                   return originalVal;
               },
               set: function(val){
                   	callback(o, str, dom);
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

	var templateParser = function(data, str){
		if(str===undefined)return;
		str = str.substr(0);
		for(var key in data){
			str = str.replace(/{{(.*?)}}/, function(match, key) {
				return data[key];
			});
		}
	    return str;
	}

	H3.lo.simpleParse = function(block, str, dom, html){
		if(!block.dataObject) return str;
		var data = block.dataObject;

		new onPropertyChange(data, str, dom, function(_data, _str, _dom){
			//console.log(str)
			console.log(templateParser(_data, _str), _dom);
			_dom.innerHTML=templateParser(_data, _str)
		});

		return templateParser(data, str);
	}

})();