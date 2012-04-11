// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.eq = function( num ){
		return wrap( this[ num ] );
	};
})();