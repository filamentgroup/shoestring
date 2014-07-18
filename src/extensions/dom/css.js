//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");// TODO: This code should be consistent with attr().

	var cssExceptions = {
		'float': [ 'cssFloat', 'styleFloat' ] // styleFloat is IE8
	};

	// IE8 uses marginRight instead of margin-right
	function convertPropertyName( str ) {
		return str.replace( /\-([A-Za-z])/g, function ( match, character ) {
			return character.toUpperCase();
		});
	}

	function setStyle( element, property, value ) {
		var convertedProperty = convertPropertyName(property);
		element.style[ property ] = value;

		if( convertedProperty !== property ) {
			element.style[ convertedProperty ] = value;
		}
		if( cssExceptions[ property ] ) {
			for( var j = 0, k = cssExceptions[ property ].length; j<k; j++ ) {
				element.style[ cssExceptions[ property ][ j ] ] = value;
			}
		}
	}

	function _getStyle( element, property ) {
		var view = document.defaultView,
				docElement = document.documentElement;

		// if defaultView is available use getComputedStyle otherwise use currentStyle
		if( view ){
			return view
				.getComputedStyle( element, null )
				.getPropertyValue( property );
		} else {
			return docElement.currentStyle[ property ] ? element.currentStyle[ property ] : undefined;
		}
	}

	var vendorPrefixes = [ '', '-webkit-', '-ms-', '-moz-', '-o-', '-khtml-' ];

	function getStyle( element, property ) {
		var convert, value, j, k;

		if( cssExceptions[ property ] ) {
			for( j = 0, k = cssExceptions[ property ].length; j < k; j++ ) {
				value = _getStyle( element, cssExceptions[ property ][ j ] );

				if( value ) {
					return value;
				}
			}
		}

		for( j = 0, k = vendorPrefixes.length; j < k; j++ ) {
			convert = convertPropertyName( vendorPrefixes[ j ] + property );

			// VendorprefixKeyName || key-name
			value = _getStyle( element, convert );

			if( convert !== property ) {
				value = value || _getStyle( element, property );
			}

			if( vendorPrefixes[ j ] ) {
				// -vendorprefix-key-name
				value = value || _getStyle( element, vendorPrefixes[ j ] + property );
			}

			if( value ) {
				return value;
			}
		}

		return undefined;
	}

	shoestring.fn.css = function( prop, value ){
		if( !this[0] ){
			return;
		}

		if( typeof prop === "object" ) {
			return this.each(function() {
				for( var key in prop ) {
					if( prop.hasOwnProperty( key ) ) {
						setStyle( this, key, prop[key] );
					}
				}
			});
		}	else {
			// assignment else retrieve first
			if( value !== undefined ){
				return this.each(function(){
					setStyle( this, prop, value );
				});
			}	else {
				return getStyle( this[0], prop );
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
