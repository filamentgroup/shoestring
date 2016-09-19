//>>excludeStart("exclude", pragmas.exclude);
define([
	"shoestring",
	"dom/is" // note this dependency is only used for a dev error
], function(){
//>>excludeEnd("exclude");

	/**
	 * Get data attached to the first element or set data values on all elements in the current set.
	 *
	 * @param {string} name The data attribute name.
	 * @param {any} value The value assigned to the data attribute.
	 * @return {any|shoestring}
	 * @this shoestring
	 */
	shoestring.fn.data = function( name, value ){
		if( name !== undefined ){
			if( value !== undefined ){
				return this.each(function(){
					if( !this.shoestringData ){
						this.shoestringData = {};
					}

					this.shoestringData[ name ] = value;
				});
			}
			else {
				if( this[ 0 ] ) {
					if( this[ 0 ].shoestringData ) {
						return this[ 0 ].shoestringData[ name ];
					}
//>>includeStart("development", pragmas.development);
					if( shoestring( this[ 0 ] ).is( "[data-" + name + "]" ) ){
						shoestring.error( 'data-attr-alias' );
					}
//>>includeEnd("development");
				}
			}
		}
		else {
			return this[ 0 ] ? this[ 0 ].shoestringData || {} : undefined;
		}
	};
//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
