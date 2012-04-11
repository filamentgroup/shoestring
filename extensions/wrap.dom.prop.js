// Extensions
(function( undefined ){
	wrap.fn.prop = function( name, val ){
		if( val !== undefined ){
			return this.each(function(){
				this[ name ] = val;
			});
		}
		else {
			return this[ 0 ][ name ];
		}
	};
})();