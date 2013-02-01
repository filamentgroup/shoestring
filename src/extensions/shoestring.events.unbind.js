// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.unbind = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				var bound = this.shoestringData.events[ evt ];
				if( "removeEventListener" in window ){
					if( callback !== undefined ) {
						this.removeEventListener( evts[ i ], bound[ callback.name ], false );
					} else {
						for ( var ev in bound ) {
							this.removeEventListener( evts[ i ], bound[ ev ], false );
						}
					}
				}
				else if( this.detachEvent ){
					this.detachEvent( "on" + bound[ callback.name ], callback );
				}
			}
		});
	};
}());