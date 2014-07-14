//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.height = function( num ){
		if( num === undefined ){
			return this[ 0 ].offsetHeight;
		} else {
			// support integer values as pixels
			num = typeof num == "string" ? num : num + "px";

			return this.each(function(){
				this.style.height = num;
			});
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
