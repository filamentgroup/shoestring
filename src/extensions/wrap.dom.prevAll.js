// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.prevAll = function(){
		var ret = [],
			next;
		this.each(function( i ){
			while( this.previousElementSibling ){
				ret = ret.concat( this.previousElementSibling );
			}
		});
		return wrap(ret);
	};
}());
