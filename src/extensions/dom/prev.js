//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prev = function( selectors ){
		var ret = [], next;

		//>>includeStart("development", pragmas.development);
		if( selectors ){
			shoestring.error( 'prev-selector' );
		}
		//>>includeEnd("development");

		this.each(function(){
			next = this.previousElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});

		return shoestring(ret);
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
