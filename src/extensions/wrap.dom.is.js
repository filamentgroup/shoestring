// Extensions
(function( undefined ){
	wrap.fn.is = function( sel ){
		var ret = false;
		this.each(function( i ){
			if( wrap.inArray( this, wrap( sel ) )  > -1 ){
				ret = true;				
			}
		});
		return ret;
	};
}());