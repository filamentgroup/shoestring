//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prev = function(){
		var ret = [], next;

		//>>includeStart("development", pragmas.development);
		if( arguments.length > 0 ){
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
