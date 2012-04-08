// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){

	wrap.fn.bind = function( evt, callback ){
		return this.each(function(){
			if( "addEventListener" in this ){
				this.addEventListener( evt, callback, false );
			}
			else if( this.attachEvent ){
				this.attachEvent( "on" + evt, callback );
			}
		});
	};
	
	
	wrap.fn.live = function( evt, callback ){

		return this.each(function(){
			
			var self = this;
		
			function newCB( event ){
				if( event.target === self ){
					callback.apply( self, arguments );
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
	

})();