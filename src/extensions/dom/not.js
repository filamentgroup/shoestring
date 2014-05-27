//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.not = function( sel ){
		var ret = [];
		this.each(function(){
			if( shoestring.inArray( this, shoestring( sel ) ) === -1 ){
				ret.push( this );
			}
		});
		return shoestring( ret );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
