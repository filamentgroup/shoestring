//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.clone = function() {
		var ret = [];
		this.each(function() {
			ret.push( this.cloneNode( true ) );
		});
		return $( ret );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
