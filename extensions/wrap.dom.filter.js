// Extensions
(function( undefined ){
	wrap.fn.filter = function( sel ){
		var ret = [],
			sel = wrap( sel );
		this.each(function( i ){
			if( wrap.inArray( sel, this ) ){
				ret.push( this );				
			}
		});
		return wrap( ret );
	};
})();