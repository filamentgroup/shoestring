// Extensions
(function( undefined ){
	wrap.fn.before = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				this.parentNode.insertBefore( i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ], this );
			}
		});
	};
	
	wrap.fn.insertBefore = function( sel ){
		return this.each(function(){
			wrap( sel ).before( this );
		});
	};
})();