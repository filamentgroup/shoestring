//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

  /**
	 * Checks the current set of elements against the selector, if one matches return `true`.
	 *
	 * @param {string} selector The selector to check.
	 * @return {boolean}
	 * @this {shoestring}
	 */
	shoestring.fn.is = function( selector ){
		var ret = false, self = this;

		this.parent().each(function( i, e ) {
			var j = 0, children;

//>>includeStart("development", pragmas.development);
				try {
//>>includeEnd("development");
					children = e.querySelectorAll( selector );
//>>includeStart("development", pragmas.development);
				} catch( e ) {
					shoestring.error( 'queryselector', selector );
				}
//>>includeEnd("development");

			while( j < children.length ){

				self.each(function() {
					if( this == children.item(j) ){
						ret = true;
					}
				});

				j++;
			}
		});

		return ret;
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
