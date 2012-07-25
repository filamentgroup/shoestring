// Extensions
(function( undefined ){
	shoestring.fn.addClass = function( cname ){
		var classes = cname.trim().split( " " );
		return this.each(function(){
			for( var i = 0, il = classes.length; i < il; i++ ){
				if( !this.className.match( new RegExp( "(^|\\s)" + classes[ i ] + "($|\\s)" ) ) ){
					this.className += " " + classes[ i ];
				}
			}
		});
	};
}());