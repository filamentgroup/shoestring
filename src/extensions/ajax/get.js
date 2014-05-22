//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/ajax/ajax" ], function( shoestring ) {
//>>excludeEnd("exclude");
(function( undefined ){
	shoestring.get = function( url, callback ){
		return shoestring.ajax( url, { success: callback } );
	};
}());
//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
