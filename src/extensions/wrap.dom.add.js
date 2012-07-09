// Extensions
(function( undefined ){
	wrap.fn.add = function( sel ){
		var ret = [];
		this.each(function( i ){
			ret.push( this );
		});
		
		wrap( sel ).each(function(){
			ret.push( this );
		});
		
		return wrap( ret );
	};
}());