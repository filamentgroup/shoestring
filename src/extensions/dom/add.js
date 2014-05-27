//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.add = function( sel ){
		var ret = [];
		this.each(function(){
			ret.push( this );
		});

		shoestring( sel ).each(function(){
			ret.push( this );
		});

		return shoestring( ret );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
