// Extensions
(function( undefined ){
	wrap.fn.removeProp = function( prop ){
		return this.each(function(){
			this[ prop ] = undefined;
			delete this[ prop ];
		});
	};
})();