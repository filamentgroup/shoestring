// Extensions
(function( undefined ){
	shoestring.fn.parents = function( sel ){
		var ret = [];
		
		this.each(function(){
			var curr = this,
				match;
			while( curr.parentElement && !match ){
				curr = curr.parentElement;
				if( sel ){
					if( curr === shoestring( sel )[0] ){
						match = true;
						if( shoestring.inArray( curr, ret ) === -1 ){
							ret.push( curr );
						}
					}
				}
				else {
					if( shoestring.inArray( curr, ret ) === -1 ){
						ret.push( curr );
					}
				}				
			}
		});
		return shoestring(ret);
	};
}());