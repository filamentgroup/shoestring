//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/shoestring.dom.is" ], function( shoestring ) {
//>>excludeEnd("exclude");// Depends on .is
// Extensions
(function( undefined ){
	shoestring.fn.closest = function( sel ){
		var ret = [];
		if( !sel ){
			return shoestring( ret );
		}

		this.each(function(){
			var element, $self = shoestring( element = this ),
				generations = 0;

			if( $self.is(sel) ){
				ret.push( this );
				return;
			}

			while( element.parentElement ) {
				if( shoestring(element.parentElement).is(sel) ){
					ret.push( this.parentElement );
					break;
				}

				element = element.parentElement;
			}
		});

		return shoestring( ret );
	};
}());
//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");// Depends on .is
