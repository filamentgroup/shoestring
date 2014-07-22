//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/prev" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prevAll = function(){
		//>>includeStart("development", pragmas.development);
		if( arguments.length > 0 ){
			shoestring.error( 'prevall-selector' );
		}
		//>>includeEnd("development");

		var result = [];

		this.each(function() {
			var $previous = shoestring( this ).prev();

			while( $previous.length ){
				result.push( $previous[0] );
				$previous = $previous.prev();
			}
		});

		return shoestring( result );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
