// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.data = function( name, val ){
		if( name !== undefined ){
			if( val !== undefined ){
				return this.each(function(){
					if( !this.shoestringData ){
						this.shoestringData = {};
					}
					this.shoestringData[ name ] = val;
				});
			}
			else {
				return this[ 0 ].shoestringData && this[ 0 ].shoestringData[ name ];
			}
		}
		else {
			return this[ 0 ].shoestringData;
		}
	};
}());