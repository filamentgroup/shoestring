//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");// TODO: This code should be consistent with attr().

	// IE8 uses marginRight instead of margin-right
	function convertPropertyName( str ) {
		return str.replace( /\-([A-Za-z])/g, function ( match, character ) {
			return character.toUpperCase();
		});
	}

	function setStyle( element, property, value ) {
		element.style[ property ] = value;
		element.style[ convertPropertyName(property) ] = value;
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
		var convert, value;

		for( var j = 0, k = vendorPrefixes.length; j < k; j++ ) {
			convert = convertPropertyName( vendorPrefixes[ j ] + property );

			value = _getStyle( element, convert ) || _getStyle( element, property );

			if( vendorPrefixes[ j ] ) {
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
