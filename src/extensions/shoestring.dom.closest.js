// Extensions
(function( undefined ){
	shoestring.fn.closest = function( sel ){
		var ret = [];
		if( !sel ){
			return shoestring( ret );
		}
		
		this.each(function(){
			var self = this,
				generations = 0;
				
			shoestring( sel ).each(function(){
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
		return shoestring( ret );
	};
}());