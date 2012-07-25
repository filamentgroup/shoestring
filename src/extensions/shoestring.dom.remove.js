// Extensions
(function( undefined ){
	shoestring.fn.remove = function( sel ){
		return this.each(function(){
			this.parentNode.removeChild( this );
		});
	};
}());