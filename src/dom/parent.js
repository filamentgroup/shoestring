//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	/**
	 * Returns the set of first parents for each element in the current set.
	 *
	 * @return shoestring
	 * @this shoestring
	 */
	shoestring.fn.parent = function(){
		var ret = [],
			parent;

		this.each(function(){
			// no parent node, assume top level
			// jQuery parent: return the document object for <html> or the parent node if it exists
			parent = (this === document.documentElement ? document : this.parentNode);

			if( parent ){
				ret.push( parent );
			}
		});

		return shoestring(ret);
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
