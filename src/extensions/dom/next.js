//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.next = function(){
		var ret = [],
			next;

		//>>includeStart("development", pragmas.development);
		if( arguments.length > 0 ){
			shoestring.error( 'next-selector' );
		}
		//>>includeEnd("development");

		this.each(function(){
			next = this.nextElementSibling;

			if( next ){
				ret = ret.concat( next );
			}
		});
		return shoestring(ret);
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
