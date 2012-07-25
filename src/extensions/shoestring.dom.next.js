// Extensions
(function( undefined ){
	shoestring.fn.next = function(){
		var ret = [],
			next;
		this.each(function( i ){
			next = this.nextElementSibling;
			if( next ){
				ret = ret.concat( next );
			}
		});
		return shoestring(ret);
	};
}());