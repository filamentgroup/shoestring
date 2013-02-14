// Extensions

// index method
(function( undefined ){
	shoestring.fn.index = function( elem ){

		// no arg? return number of prev siblings
		if( elem === undefined ){
			var ret = 0,
				self = this[ 0 ];

			while( self.previousElementSibling !== null && self.previousElementSibling !== undefined ){
				self = self.previousElementSibling;
				ret++;
			}
			return ret;
		}
		else {
			// arg? get its index within the jq obj
			elem = shoestring( elem )[ 0 ];

			for( var i = 0; i < this.length; i++ ){
				if( this[ i ] === elem ){
					return i;
				}
			}
			return -1;
		}
	};
}());