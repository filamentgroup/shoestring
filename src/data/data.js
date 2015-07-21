//>>excludeStart("exclude", pragmas.exclude);
define([
	"shoestring",
	"dom/attr",
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
					return shoestring( this[ 0 ] ).attr( "data-" + name ) || undefined;
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
