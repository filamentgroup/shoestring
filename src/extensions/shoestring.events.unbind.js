// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.unbind = function( evt, callback ){
		return this.each(function(){
			if( "removeEventListener" in this ){
				this.removeEventListener( evt, callback );
			}
			else if( this.detachEvent ){
				this.detachEvent( "on" + evt, callback );
			}
		});
	};
}());