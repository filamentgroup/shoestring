//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/ajax/ajax" ], function( shoestring ) {
//>>excludeEnd("exclude");
(function( undefined ){
	shoestring.post = function( url, data, callback ){
		return shoestring.ajax( url, { data: data, method: "POST", success: callback } );
	};
}());
//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
