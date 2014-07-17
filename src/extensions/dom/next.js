//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/index" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.next = function(){
		//>>includeStart("development", pragmas.development);
		if( arguments.length > 0 ){
			shoestring.error( 'next-selector' );
		}
		//>>includeEnd("development");

		var result = [];

		// TODO need to implement map
		this.each(function() {
			var children, item;

			// get the child nodes for this member of the set
			children = shoestring( this.parentNode )[0].childNodes;

			// grab the next element based on the current element's index
			item = children.item( shoestring( this ).index() + 1 );

			// push the item onto the result set if it exists
			if( item ) {
				result.push( item );
			}
		});

		return shoestring( result );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
