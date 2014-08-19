//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	/**
	 * Returns the set of parents for each element in the current set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.parent = function(){
		var ret = [],
			parent;

		this.each(function(){
			// no parent node, assume top level
			// TODO maybe this should be a more precise check for the document?
			parent = this.parentElement || document.documentElement;

			if( parent ){
				ret.push( parent );
			}
		});

		return shoestring(ret);
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
