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
				if( self === this && !ret.length ){
					ret.push( self );
				}
			});
			
			if( !ret.length ){
				shoestring( sel ).each(function(){
					var i = 0,
						otherSelf = self;

					while( otherSelf.parentElement && ( !generations || i < generations ) ){
						i++;
						if( otherSelf.parentElement === this ){
							ret.push( otherSelf.parentElement );
							generations = i;
						}
						else{
							otherSelf = otherSelf.parentElement;
						}
					}
				});
			}
			
		});
		return shoestring( ret );
	};
}());