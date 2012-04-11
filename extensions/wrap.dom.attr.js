// Extensions
(function( undefined ){
	wrap.fn.attr = function( name, val ){
		if( val !== undefined ){
			return this.each(function(){
				this.setAttribute( name, val );
			});
		}
		else {
			return this[ 0 ].getAttribute( name );
		}
	};
})();