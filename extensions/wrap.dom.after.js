// Extensions
(function( undefined ){
	wrap.fn.after = function( frag ){
		if( typeof( frag ) === "string" || frag.nodeType !== undefined ){
			frag = wrap( frag );
		}
		return this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				var insertEl = i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ];
				this.parentNode.insertBefore( insertEl, this );
				this.parentNode.insertBefore( this, insertEl );
			}
		});
	};
	
	wrap.fn.insertAfter = function( sel ){
		return this.each(function(){
			wrap( sel ).after( this );
		});
	};
})();