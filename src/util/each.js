//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

  /**
	 * Non-shoestring-object iteration.
	 *
	 * @param {object} obj The object to iterate over
	 * @param {function} callback The callback to pass each item
	 * @param {array} args Extra arguments for the callback
	 * @return shoestring
	 * @this window
	 */
	shoestring.each = function( obj, callback, args ){
		var value,
			i = 0,
			length = obj.length,
			isArray = ( typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Array]' );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return shoestring( obj );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
