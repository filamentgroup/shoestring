//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

  /**
	 * Checks the current set of elements against the selector, if one matches return `true`.
	 *
	 * @param {string} selector The selector to check.
	 * @return {boolean}
	 * @this {shoestring}
	 */
	shoestring.fn.is = function( selector ){
		var ret = false, self = this, parents, check;

		// assume a dom element
		if( typeof selector !== "string" ){
			// array-like, ie shoestring objects or element arrays
			if( selector.length && selector[0] ){
				check = selector;
			} else {
				check = [selector];
			}

			return _checkElements(this, check);
		}

		parents = this.parent();

		if( !parents.length ){
			parents = shoestring( doc );
		}

		parents.each(function( i, e ) {
			var children;

//>>includeStart("development", pragmas.development);
				try {
//>>includeEnd("development");
					children = e.querySelectorAll( selector );
//>>includeStart("development", pragmas.development);
				} catch( e ) {
					shoestring.error( 'queryselector', selector );
				}
//>>includeEnd("development");

			ret = _checkElements( self, children );
		});

		return ret;
	};

	function _checkElements(needles, haystack){
		var ret = false;

		needles.each(function() {
			var j = 0;

			while( j < haystack.length ){
				if( this === haystack[j] ){
					ret = true;
				}

				j++;
			}
		});

		return ret;
	}

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
