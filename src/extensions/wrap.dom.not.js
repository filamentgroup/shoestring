// Extensions
(function( undefined ){
	wrap.fn.not = function( sel ){
		var ret = [];
		this.each(function( i ){
			if( wrap.inArray( this, wrap( sel ) ) === -1 ){
				ret.push( this );				
			}
		});
		return wrap( ret );
	};
}());