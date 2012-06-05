// Extensions
(function( undefined ){
	wrap.fn.removeClass = function( cname ){
		return this.each(function(){
			this.className = this.className.replace( new RegExp( cname, "gmi" ), "" );
		});
	};
}());