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

		// return an empty shoestring object
		if( !prim ){
			return new shoestring.Shoestring( ret );
		}

		// read calls
		if( pType === "function" ){
			return shoestring.ready( prim );
		}

		// handle re-wrapping shoestring objects
		if( prim.constructor === shoestring.Shoestring && !sec ){
			return prim;
		}

		// if string starting with <, make html
		if( pType === "string" && prim.indexOf( "<" ) === 0 ){
			var dfrag = document.createElement( "div" );

			dfrag.innerHTML = prim;

			// TODO depends on children (circular)
			return shoestring( dfrag ).children().each(function(){
				dfrag.removeChild( this );
			});
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

			return new shoestring.Shoestring( sel, prim );
		}

		// confused about this case
		if( Object.prototype.toString.call( pType ) === '[object Array]' ||
				pType === "object" &&
				prim instanceof w.NodeList ){

			return new shoestring.Shoestring( prim, prim );
		}

		// if it's an array, use all the elements
		if( prim.constructor === Array ){
			return new shoestring.Shoestring( prim, prim );
		}


		// otherwise assume it's an object the we want at an index
		return new shoestring.Shoestring( [prim], prim );
	}

	shoestring.Shoestring = function( ret, prim ) {
		this.length = 0;
		this.selector = prim;
		shoestring.merge(this, ret);
	};

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
