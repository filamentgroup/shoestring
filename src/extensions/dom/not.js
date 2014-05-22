// Extensions
(function( undefined ){
	shoestring.fn.not = function( sel ){
		var ret = [];
		this.each(function( i ){
			if( shoestring.inArray( this, shoestring( sel ) ) === -1 ){
				ret.push( this );				
			}
		});
		return shoestring( ret );
	};
}());