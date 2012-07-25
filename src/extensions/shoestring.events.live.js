// Extensions

// keep this shoestringper around the ones you use!
(function( undefined ){
	shoestring.fn.live = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			var self = this;
			
			function newCB( e ){
				if( event.target === self ){
					callback.call( self, e );
				}
			}
			
			for( var i = 0, il = evts.length; i < il; i++ ){
				if( "addEventListener" in document ){
					document.addEventListener( evts[ i ], newCB, false );
				}
				else if( document.attachEvent ){
					document.attachEvent( "on" + evts[ i ], newCB );
				}
			}
		});
	};
}());