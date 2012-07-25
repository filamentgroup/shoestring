// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.unbind = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				if( "removeEventListener" in this ){
					this.removeEventListener( evts[ i ], callback );
				}
				else if( this.detachEvent ){
					this.detachEvent( "on" + evts[ i ], callback );
				}
			}
		});
	};
}());