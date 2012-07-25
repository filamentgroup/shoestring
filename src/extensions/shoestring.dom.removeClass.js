// Extensions
(function( undefined ){
	shoestring.fn.removeClass = function( cname ){
		var classes = cname.trim().split( " " );
		
		return this.each(function(){
			for( var i = 0, il = classes.length; i < il; i++ ){
				if( this.className !== undefined ){
					this.className = this.className.replace( new RegExp( "(^|\\s)" + classes[ i ] + "($|\\s)", "gmi" ), " " );
				}
			}
		});
	};
}());