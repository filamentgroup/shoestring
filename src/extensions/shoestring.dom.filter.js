// Extensions
(function( undefined ){
	shoestring.fn.filter = function( sel ){
		var ret = [],
			wsel =  shoestring( sel );

		this.each(function(){
			
			if( !this.parentNode ){
				var context = shoestring( document.createDocumentFragment() );
				context[ 0 ].appendChild( this );
				wsel = shoestring( sel, context );
			}
			
			if( shoestring.inArray( this, wsel ) > -1 ){
				ret.push( this );				
			}
		});

		return shoestring( ret );
	};
}());