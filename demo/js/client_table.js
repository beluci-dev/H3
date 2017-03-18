var demo = new H3.Block(function(){

	var main = this.elem('div', {css:'main'});

		this.elem('h3', {dest:main, text:'Client Table'})

		var input = this.elem('input', {dest:main, css:'form-control input-xs', placeholder:'Name'});

		var btn = this.elem('button', {dest:main, css:'btn btn-xs btn-primary', text:'Send'});

		var table = this.elem('div', {dest:main, css:'list-group'});
			this.elem('a', {dest:table, css:'list-group-item active', text:'List'});

		var block = this;
		btn.onClick(function(){
			block.elem('a', {dest:table, css:'list-group-item', text: input.value()});
			input.value('');
		});

});

demo.build().render(document.body);