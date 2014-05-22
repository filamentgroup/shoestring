//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/ajax/ajax" ], function( shoestring ) {
//>>excludeEnd("exclude");

(function( undefined ){
	shoestring.fn.load = function( url, callback ){
		var self = this,
			args = arguments,
			intCB = function( data ){
				self.each(function(){
					shoestring( this ).html( data );
				});
				if( callback ){
					callback.apply( self, args );
				}
		};
		shoestring.ajax( url, { success: intCB } );
		return this;
	};
}());

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
