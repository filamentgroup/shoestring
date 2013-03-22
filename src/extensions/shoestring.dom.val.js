// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.val = function( val ){
		if( val !== undefined ){
			return this.each(function(){
				if( this.tagName === "SELECT" ){
					var optionSet, option,
						options = elem.options,
						values = [],
						i = options.length,
						newIndex;

					values[0] = val;
					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = shoestring.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
							newIndex = i;
						}
					}
					// force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					} else {
						elem.selectedIndex = i;
					}
				} else {
					this.value = val;
				}
			});
		}
		else {
			if( this.tagName === "SELECT" ){
				return this.options[ this[0].selectedIndex ].value;
			} else {
				return this[0].value;
			}
		}
	};
}());