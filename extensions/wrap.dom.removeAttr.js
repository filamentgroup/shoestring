// Extensions
(function( undefined ){
	wrap.fn.removeAttr = function( attr ){
		return this.each(function(){
			this.removeAttribute( attr );
		});
	};
})();