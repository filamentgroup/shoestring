// Extensions
(function( undefined ){
	wrap.fn.filter = function( sel ){
		var ret = [],
			wsel =  wrap( sel );

		this.each(function(){
			
			if( !this.parentNode ){
				var context = wrap( document.createDocumentFragment() );
				context[ 0 ].appendChild( this );
				wsel = wrap( sel, context );
			}
			
			if( wrap.inArray( this, wsel ) > -1 ){
				ret.push( this );				
			}
		});

		return wrap( ret );
	};
})();