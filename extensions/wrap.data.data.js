// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.data = function( name, val ){
		if( name !== undefined ){
			if( val !== undefined ){
				return this.each(function(){
					if( !this.wrapData ){
						this.wrapData = {};
					}
					this.wrapData[ name ] = val;
				});
			}
			else {
				return this[ 0 ].wrapData && this[ 0 ].wrapData[ name ];
			}
		}
		else {
			return this[ 0 ].wrapData;
		}
	};
})();