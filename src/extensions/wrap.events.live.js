// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	wrap.fn.live = function( evt, callback ){
		return this.each(function(){
			
			var self = this;
		
			function newCB( event ){
				if( event.target === self ){
					callback.apply( self, [ evt ].concat( event.args || [] ) );
				}
			}
			
			if( "addEventListener" in document ){
				document.addEventListener( evt, newCB, false );
			}
			else if( document.attachEvent ){
				document.attachEvent( "on" + evt, newCB );
			}
		});
	};
}());