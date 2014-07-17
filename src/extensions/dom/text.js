//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.text = function() {
		//>>includeStart("development", pragmas.development);
		if( arguments.length > 0 ){
			shoestring.error( 'text-setter' );
		}
		//>>includeEnd("development");

		var ret = "";

		this.each(function(){
			var e = this;
			var nodeType = e.nodeType;
			// NOTE taken directly from the sizzle source
			if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
				// Use textContent for elements
				if ( typeof e.textContent === "string" ) {
					ret = e.textContent;
				} else {
					// Traverse its children
					for ( e = e.firstChild; e; e = e.nextSibling ) {
						ret += shoestring( e ).text();
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				ret = e.nodeValue;
			}
		});

		return ret;
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");

