// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.eq = function( num ){
		if( num < 0 ){
			return shoestring([]);
		}
		return shoestring( this[ num ] );
	};
}());