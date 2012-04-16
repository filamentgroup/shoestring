// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.removeData = function( name ){
		return this.each(function(){
			if( name !== undefined && this.wrapData ){
				this.wrapData[ name ] = undefined;
				delete this.wrapData[ name ];
			}
			else {
				this[ 0 ].wrapData = {};
			}
		});
	};
})();