//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/ajax/ajax" ], function( shoestring ) {
//>>excludeEnd("exclude");

	shoestring.get = function( url, callback ){
		return shoestring.ajax( url, { success: callback } );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
