//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "dom/propFix.js" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.removeProp = function( prop ){
		var name = shoestring.propFix[ prop ] || prop;

		return this.each(function(){
			this[ name ] = undefined;
			delete this[ name ];
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
