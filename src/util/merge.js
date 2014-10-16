//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

  /**
	 * Merge two arrays by appending.
	 *
	 * @param {array} first The first array
	 * @param {array} second The second array
	 * @return shoestring
	 * @this window
	 */
	shoestring.merge = function( first, second ){
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return shoestring( first );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
