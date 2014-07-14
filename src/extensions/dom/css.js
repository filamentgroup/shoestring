//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");// TODO: This code should be consistent with attr().

	// IE8 uses marginRight instead of margin-right
	function convertPropertyName( str ) {
		return document.defaultView ? str : str.replace( /\-([A-Za-z])/g, function ( match, character ) {
			return character.toUpperCase();
		});
	}

	shoestring.fn.css = function( prop, val ){
		if( typeof prop === "object" ) {
			return this.each(function() {
				for( var key in prop ) {
					if( prop.hasOwnProperty( key ) ) {
						this.style[ convertPropertyName( key ) ] = prop[ key ];
					}
				}
			});
		}
		else {
			prop = convertPropertyName( prop );
			if( val !== undefined ){
				return this.each(function(){
					this.style[ prop ] = val;
				});
			}
			else {
				return this[ 0 ] ? ( document.defaultView ?
						document.defaultView.getComputedStyle( this[ 0 ], null ).getPropertyValue( prop ) :
						// Because IE8 returns invalid properties in currentStyle, we compare against a control element
						( document.documentElement.currentStyle[ prop ] ? this[ 0 ].currentStyle[ prop ] : undefined ) ) :
					undefined;
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
