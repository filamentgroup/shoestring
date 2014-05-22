//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.width = function( num ){
		if( num === undefined ){
			return this[ 0 ].offsetWidth;
		}
		else {
			return this.each(function(){
				this.style.width = num;
			});
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
