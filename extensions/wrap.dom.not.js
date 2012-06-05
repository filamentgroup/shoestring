// Extensions
(function( undefined ){
	wrap.fn.not = function( sel ){
		var ret = [],
			sel = wrap( sel );
		this.each(function( i ){
			if( wrap.inArray( this, sel ) === -1 ){
				ret.push( this );				
			}
		});
		return wrap( ret );
	};
}());