// Extensions
(function( undefined ){
	wrap.fn.closest = function( sel ){
		var ret = [];
		if( !sel ){
			return wrap( ret );
		}
		
		this.each(function(){
			var self = this,
				generations = 0;
				
			wrap( sel ).each(function(){
				if( self === this ){
					ret[ 0 ] = self;
				}
				else {
					var i = 0;
					while( self.parentElement && ( !generations || i < generations ) ){
						i++;
						if( self.parentElement === this ){
							ret[ 0 ] = self.parentElement;
							generations = i;
						}
						else{
							self = self.parentElement;
						}
					}
				}
			});
		});
		return wrap( ret );
	};
})();