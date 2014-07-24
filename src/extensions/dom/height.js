//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/dimension" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.height = function( num ){
		return _dimension( this, "height", num );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
