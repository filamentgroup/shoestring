// Extensions
(function( undefined ){
	wrap.fn.is = function( sel ){
		var ret = false,
			sel = wrap( sel );
		this.each(function( i ){
			if( wrap.inArray( this, sel )  > -1 ){
				ret = true;				
			}
		});
		return ret;
	};
}());