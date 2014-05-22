// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.on = function( evt, callback ){
		var evts = evt.split( " " ),
			sel = this.selector;
		
		function newCB( e ){
			shoestring( sel ).each(function(){
				if( e.target === this ){
					callback.apply( this, [ e ].concat( e._args ) );
				}
			});
		}
		
		for( var i = 0, il = evts.length; i < il; i++ ){
			if( "addEventListener" in document ){
				document.addEventListener( evts[ i ], newCB, false );
			}
			else if( document.attachEvent ){
				document.attachEvent( "on" + evts[ i ], newCB );
			}
		}
		return this;
	};
	shoestring.fn.live = shoestring.fn.on;
}());
