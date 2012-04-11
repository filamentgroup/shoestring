// Extensions
(function( undefined ){
	wrap.get = function( url, callback ){
		return wrap.ajax( url, { success: callback } );
	};
})();