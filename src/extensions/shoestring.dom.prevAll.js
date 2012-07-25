// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.prevAll = function(){
		var ret = [],
			next;
		this.each(function( i ){
			while( this.previousElementSibling ){
				ret = ret.concat( this.previousElementSibling );
			}
		});
		return shoestring(ret);
	};
}());
