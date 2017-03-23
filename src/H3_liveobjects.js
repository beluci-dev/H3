(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.lo = {};

	// !!!UNDER CONSTRUCTION!!! (THIS IS JUST A TEST)
	H3.lo.parseData = function(str, data, dom, html){
		if(!data) return str;

		var parse = str;

		for(var key in data){
			if (str.indexOf('{{'+key+'}}') == -1) continue;

			var val = data[key];
      var reg = new RegExp('{{\\s?'+key+'\\s?}}', 'ig');
      parse = parse.replace(reg, val);

			Object.defineProperty(data, key, {
				get: function(){
					return val;
				},
				set: function(newval){
					var newparse = str.replace(reg, val);
					if(newparse != parse){
					 	if(html){
							dom.innerHTML=newparse;
						}else{
							dom.innerText=newparse;
						}
					}
					return val = newval;
				}
			});
    }
    return parse;
	}
	// !!!UNDER CONSTRUCTION!!! (THIS IS JUST A TEST)

})();