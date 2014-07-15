//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prev = function(selectors){
		var ret = [],
			next;
//>>excludeStart("exclude", pragmas.exclude);
	if( selectors ){
		throw new Error( "Shoestring does not support passing selectors into .prev, try .prev().filter(selector)" );
	}
//>>excludeEnd("exclude");
		this.each(function(){
			next = this.previousElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});
		return shoestring(ret);
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
