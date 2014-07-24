//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.dimension = function( name, num ){
		var offsetName;

		if( num === undefined ){
			offsetName = name.replace(/^[a-z]/, function( letter ) {
				return letter.toUpperCase();
			});

			return this[ 0 ][ "offset" + offsetName ];
		} else {
			// support integer values as pixels
			num = typeof num === "string" ? num : num + "px";

			return this.each(function(){
				this.style[ name ] = num;
			});
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
