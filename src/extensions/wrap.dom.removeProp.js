// Extensions
(function( undefined ){
	wrap.fn.removeProp = function( prop ){
		var name = wrap.propFix && wrap.propFix[ name ] || name;
		return this.each(function(){
			this[ prop ] = undefined;
			delete this[ prop ];
		});
	};
}());