// Extensions.
(function( undefined ){
	shoestring.fn.clone = function() {
		var ret = [];
		this.each(function() {
			ret.push( this.cloneNode( true ) );
		});
		return $( ret );
	};
}());