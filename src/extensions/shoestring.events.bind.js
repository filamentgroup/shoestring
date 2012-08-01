// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.bind = function( evt, callback ){
		var evts = evt.split( " " )
		
		function newCB( e ){
			return callback.apply( this, [ e ].concat( e._args ) );
		}
		
		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				if( "addEventListener" in this ){
					this.addEventListener( evts[ i ], newCB, false );
				}
				else if( this.attachEvent ){
					this.attachEvent( "on" + evts[ i ], newCB );
				}
			}
		});
	};
}());