//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.index = function( elem ){
		var found, result, children;

		//>>includeStart("development", pragmas.development);
		if( typeof elem === "string" ){
			shoestring.error( 'index-selector' );
		}
		//>>includeEnd("development");

		// no arg? return number of prev siblings
		if( elem === undefined ){
			children = (this[0].parentNode || document.documentElement).childNodes;

			for( var i = result = 0; i < children.length; i++ ) {
				if( this[0] === children.item(i) ){
					return result;
				}

				if( children.item(i).nodeType === 1 ){
					result++;
				}
			}

			return -1;
		} else {
			// arg? get its index within the jq obj
			for( var i = 0; i < this.length; i++ ){
				found = shoestring( elem, this[i].parentNode )[ 0 ];

				if( this[ i ] === found ){
					return i;
				}
			}

			return -1;
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
