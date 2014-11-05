//>>excludeStart("exclude", pragmas.exclude);
define([], function(){
	//>>excludeEnd("exclude");

	/**
	 * The shoestring object constructor.
	 *
	 * @param {string,object} prim The selector to find or element to wrap.
	 * @param {object} sec The context in which to match the `prim` selector.
	 * @returns shoestring
	 * @this window
	 */
	function shoestring( prim, sec ){
		var pType = typeof( prim ),
				ret = [],
				sel;

		if( prim ){
			// if string starting with <, make html
			if( pType === "string" && prim.indexOf( "<" ) === 0 ){
				var dfrag = document.createElement( "div" );

				dfrag.innerHTML = prim;

				return shoestring( dfrag ).children().each(function(){
					dfrag.removeChild( this );
				});
			}

			if( pType === "function" ){
				return shoestring.ready( prim );
			}

			// handle re-wrapping shoestring objects
			if( prim.constructor === shoestring.Shoestring && !sec ){
				return prim;
			}

			// if string, it's a selector, use qsa
			if( pType === "string" ){
				if( sec ){
					return shoestring( sec ).find( prim );
				}

//>>includeStart("development", pragmas.development);
				try {
//>>includeEnd("development");
					sel = document.querySelectorAll( prim );
//>>includeStart("development", pragmas.development);
				} catch( e ) {
					shoestring.error( 'queryselector', prim );
				}
//>>includeEnd("development");
				for( var i = 0, il = sel.length; i < il; i++ ){
					ret[ i ] = sel[ i ];
				}
			} else if( Object.prototype.toString.call( pType ) === '[object Array]' ||
		             pType === "object" && prim instanceof w.NodeList ){

			  for( var i2 = 0, il2 = prim.length; i2 < il2; i2++ ){
					ret[ i2 ] = prim[ i2 ];
				}
		  } else {
				// object? passthrough
				// TODO handle concat of shoestring objects
				ret = ret.concat( prim );
			}
		}

		var ssObj = new shoestring.Shoestring();

		ssObj.length = 0;
		shoestring.merge(ssObj, ret);

		ret.selector = prim;

		return ssObj;
	}

	shoestring.Shoestring = function() {};

	// TODO only required for tests
	shoestring.Shoestring.prototype.reverse = [].reverse;

	// For adding element set methods
	shoestring.fn = shoestring.Shoestring.prototype;

	// For extending objects
	// TODO move to separate module when we use prototypes
	shoestring.extend = function( first, second ){
		for( var i in second ){
			if( second.hasOwnProperty( i ) ){
				first[ i ] = second[ i ];
			}
		}

		return first;
	};

  // taken directly from jQuery
	shoestring.merge = function( first, second ) {
		var len, j, i;

		len = +second.length,
		j = 0,
		i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	};

	// expose
	window.shoestring = shoestring;

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
