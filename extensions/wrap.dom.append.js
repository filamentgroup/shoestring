// Extensions
(function( undefined ){
	wrap.fn.append = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				this.appendChild( i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ] );
			}
		});
	};
	
	wrap.fn.appendTo = function( sel ){
		return this.each(function(){
			wrap( sel ).append( this );
		});
	};
	
})();