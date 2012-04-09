// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){

	wrap.fn.bind = function( evt, callback ){
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
	
	wrap.fn.trigger = function( evt, args ){
		return this.each(function(){
			// TODO needs IE8 support
			if( document.createEvent ){
				var event = document.createEvent( "Event" );
				event.initEvent( evt, true, true );
				event.args = args;
				this.dispatchEvent( event );
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