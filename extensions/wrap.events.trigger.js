// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
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
})();