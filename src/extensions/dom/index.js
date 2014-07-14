//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.index = function( elem ){
		var found, doc = window.document.documentElement;

		// no arg? return number of prev siblings
		if( elem === undefined ){
			var ret = 0,
				self = this[ 0 ];

			while( self.previousElementSibling !== null && self.previousElementSibling !== undefined ){
				self = self.previousElementSibling;
				ret++;
			}

			return ret;
		} else {
			// arg? get its index within the jq obj
			for( var i = 0; i < this.length; i++ ){
				found = shoestring( elem, this[i].parentNode || doc )[ 0 ];

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
