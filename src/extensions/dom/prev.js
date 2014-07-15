//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.prev = function(selectors){
		var ret = [],
			next;

		//>>includeStart("development", pragmas.development);
		if( selectors ){
			throw new Error( "Shoestring does not support passing selectors into .prev, try .prev().filter(selector)" );
		}
		//>>includeEnd("development");

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
