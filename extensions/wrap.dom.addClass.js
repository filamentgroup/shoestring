// Extensions
(function( undefined ){
	wrap.fn.addClass = function( cname ){
		return this.each(function(){
			this.className += " " + cname;
		});
	};
})();