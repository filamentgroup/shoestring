//>>excludeStart("exclude", pragmas.exclude);
define([
	"shoestring",
	"extensions/dom/css/exceptions",
	"extensions/dom/css/getComputedStyle"
], function(){
//>>excludeEnd("exclude");

	/* jshint unused: false */

	var cssExceptions = shoestring.cssExceptions;

	// IE8 uses marginRight instead of margin-right
	function convertPropertyName( str ) {
		return str.replace( /\-([A-Za-z])/g, function ( match, character ) {
			return character.toUpperCase();
		});
	}

	function _getStyle( element, property ) {
		// polyfilled in getComputedStyle module
		return window.getComputedStyle( element, null ).getPropertyValue( property );
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

  shoestring._getStyle = getStyle;

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
