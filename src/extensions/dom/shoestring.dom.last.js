// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.last = function(){
		return this.eq( this.length - 1 );
	};
}());
