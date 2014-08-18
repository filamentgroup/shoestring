//>>excludeStart("exclude", pragmas.exclude);
define([
  "shoestring",
  "extensions/dom/css/exceptions",
  "extensions/dom/css/getStyle",
  "extensions/dom/css/setStyle"
], function(){
//>>excludeEnd("exclude");// TODO: This code should be consistent with attr().

	shoestring.fn.css = function( prop, value ){
		if( !this[0] ){
			return;
		}

		if( typeof prop === "object" ) {
			return this.each(function() {
				for( var key in prop ) {
					if( prop.hasOwnProperty( key ) ) {
						shoestring._setStyle( this, key, prop[key] );
					}
				}
			});
		}	else {
			// assignment else retrieve first
			if( value !== undefined ){
				return this.each(function(){
					shoestring._setStyle( this, prop, value );
				});
			}

			return shoestring._getStyle( this[0], prop );
		}
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
