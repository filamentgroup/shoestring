// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.eq = function( num ){
		return shoestring( this[ num ] );
	};
}());