// Extensions
(function( undefined ){
	wrap.fn.prev = function(){
		var ret = [],
			next;
		this.each(function( i ){
			next = this.previousElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});
		return wrap(ret);
	};
}());