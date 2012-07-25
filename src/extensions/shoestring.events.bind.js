// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.bind = function( evt, callback ){
		return this.each(function(){
			
			var cb = function( e ){
				callback.apply( this, [ e ].concat( e.args || [] )  );
			};
			
			if( "addEventListener" in this ){
				this.addEventListener( evt, cb, false );
			}
			else if( this.attachEvent ){
				this.attachEvent( "on" + evt, cb );
			}
		});
	};
}());