// Extensions
(function( undefined ){
	wrap.fn.parents = function( sel ){
		var ret = [];
		
		this.each(function(){
			var curr = this,
				match;
			while( curr.parentElement && !match ){
				curr = curr.parentElement;
				if( sel ){
					if( curr === wrap( sel )[0] ){
						match = true;
						if( wrap.inArray( curr, ret ) === -1 ){
							ret.push( curr );
						}
					}
				}
				else {
					if( wrap.inArray( curr, ret ) === -1 ){
						ret.push( curr );
					}
				}				
			}
		});
		return wrap(ret);
	};
}());