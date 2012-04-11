// Extensions
(function( undefined ){
	wrap.fn.parent = function(){
		var ret = [],
			parent;
		this.each(function(){
			parent = this.parentElement;
			if( parent ){
				ret.push( parent );
			}
		});
		return wrap(ret);
	};
})();