// Extensions
(function( undefined ){
	shoestring.fn.removeProp = function( prop ){
		var name = shoestring.propFix && shoestring.propFix[ name ] || name;
		return this.each(function(){
			this[ prop ] = undefined;
			delete this[ prop ];
		});
	};
}());