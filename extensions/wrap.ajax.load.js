// Extensions
(function( undefined ){
	wrap.fn.load = function( url, callback ){
		var self = this,
			args = arguments,
			intCB = function( data ){
				self.each(function(){
					wrap( this ).html( data );
				});
				if( callback ){
					callback.apply( self, args );
				}
		};
		wrap.ajax( url, { success: intCB } );
		return this;
	};
}());