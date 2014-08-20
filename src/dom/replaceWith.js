//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	/**
	 * Replace each element in the current set with that argument HTML string or HTMLElement.
	 *
	 * @param {string|HTMLElement} fragment The value to assign.
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.replaceWith = function( fragment ){
		if( typeof( fragment ) === "string" ){
			fragment = shoestring( fragment );
		}

		var ret = [];

		this.each(function( i ){
			for( var j = 0, jl = fragment.length; j < jl; j++ ){
				var insertEl = i > 0 ? fragment[ j ].cloneNode( true ) : fragment[ j ];

				this.parentNode.insertBefore( insertEl, this );
				insertEl.parentNode.removeChild( this );
				ret.push( insertEl );
			}
		});

		return shoestring( ret );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
