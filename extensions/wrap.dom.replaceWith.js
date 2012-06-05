// Extensions
(function( undefined ){
	wrap.fn.replaceWith = function( frag ){
		if( typeof( frag ) === "string" ){
			frag = wrap( frag );
		}
		var ret = [];
		this.each(function( i ){
			for( var j = 0, jl = frag.length; j < jl; j++ ){
				var insertEl = i > 0 ? frag[ j ].cloneNode( true ) : frag[ j ];
				this.parentNode.insertBefore( insertEl, this );
				insertEl.parentNode.removeChild( this );
				ret.push( insertEl );
			}
		});
		return wrap( ret );
	};
}());