// Extensions
(function( undefined ){
	wrap.fn.remove = function( sel ){
		return this.each(function(){
			this.parentNode.removeChild( this );
		});
	};
}());