// Extensions
(function( undefined ){
	wrap.fn.removeClass = function( cname ){
		var classes = cname.split( " " );
		
		return this.each(function(){
			for( var i = 0, il = classes.length; i < il; i++ ){
				this.className = this.className.replace( new RegExp( classes[ i ] + "[$\s]*", "gmi" ), "" );
			}
		});
	};
}());