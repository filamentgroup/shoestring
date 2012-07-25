// Extensions
(function( undefined ){
	shoestring.get = function( url, callback ){
		return shoestring.ajax( url, { success: callback } );
	};
}());