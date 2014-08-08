//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.filter = function( sel ){
		var ret = [];

		//>>includeStart("development", pragmas.development);
		if( typeof sel === 'function' ){
			shoestring.error( 'filter-function' );
		}
		//>>includeEnd("development");

		this.each(function(){

			if( !this.parentNode ){
				var context = shoestring( document.createDocumentFragment() );
				context[ 0 ].appendChild( this );
				wsel = shoestring( sel, context );
			} else {
				wsel = shoestring( sel, this.parentNode );
			}

			if( shoestring.inArray( this, wsel ) > -1 ){
				ret.push( this );
			}
		});

		return shoestring( ret );
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
