// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.prevAll = function(){
		var ret = [];
		this.each(function( i ){
			var self = this;
			while( self.previousElementSibling ){
				ret = ret.concat( self.previousElementSibling );
				self = self.previousElementSibling;
			}
		});
		return shoestring(ret);
	};
}());
