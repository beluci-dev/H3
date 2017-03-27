(function(){
	if(typeof H3 == 'undefined') H3 = {};

	H3.lo = {
		storage:{}
	};

	H3.lo.templateParser = function(data, strbase, dom){
		if(!data) return str;

		// Template string shallow copy
		str = strbase.substr(0);

		// Replacing the {{ }} with the data
		str = str.replace(/{{(.*?)}}/g, function(match, key){
			dom.useData = key;
			return data[key];
		});	

		return str;
	}

})();