// Extensions.
(function( undefined ){	// TODO: This code should be consistent with attr().
	shoestring.fn.css = function( prop, val ){
		if( typeof prop === "object" ) {
			return this.each(function() {
				for( var key in prop ) {
					if( prop.hasOwnProperty( key ) ) {
						this.style[ key ] = prop[ key ];
					}
				}
			});
		}
		else {
			if( val !== undefined ){
				return this.each(function(){
					this.style[ prop ] = val;
				});
			}
			else {
				return window.getComputedStyle( this[ 0 ], null ).getPropertyValue( prop );
			}
		}
	};
}());