//>>excludeStart("exclude", pragmas.exclude);
define([
  "shoestring",
  "extensions/dom/css/exceptions"
], function(){
//>>excludeEnd("exclude");// TODO: This code should be consistent with attr().

	var cssExceptions = shoestring.cssExceptions;

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

	shoestring.fn.css = function( prop, value ){
		//>>includeStart("development", pragmas.development);
		if( typeof prop !== "object" && value === undefined ){
			shoestring.error( "css-get" );
		}
		//>>includeEnd("development");

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
			}

			// NOTE saved for a distant ie8-less future: src/extenstions/dom/css/getStyle.js
			// shoestring.getStyle( this[0], prop );
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
