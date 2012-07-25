// Extensions
(function( undefined ){
	shoestring.fn.add = function( sel ){
		var ret = [];
		this.each(function( i ){
			ret.push( this );
		});
		
		shoestring( sel ).each(function(){
			ret.push( this );
		});
		
		return shoestring( ret );
	};
}());