// Extensions
(function( undefined ){
	wrap.post = function( url, data, callback ){
		return wrap.ajax( url, { data: data, method: "POST", success: callback } );
	};
})();