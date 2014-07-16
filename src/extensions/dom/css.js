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

		// if the defaultView is available use that to calculate the style
		// otherwise use the property from the object itself
		if( view ){
			return view
				.getComputedStyle( element, null )
				.getPropertyValue( property );
		} else {
			return docElement.currentStyle[ property ] ? element.currentStyle[ property ] : undefined;
		}
	}

	function getStyle( element, property ) {
		var convert = convertPropertyName( property );

		// try both default to undefined
		return _getStyle( element, convert ) || _getStyle( element, property ) || undefined;
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
				// try both prop types nad
				return getStyle( this[0], prop );
			}
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
