// Extensions

// keep this wrapper around the ones you use!
(function( undefined ){
	shoestring.fn.trigger = function( evt, args ){
		var evts = evt.split( " " );
		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				// TODO needs IE8 support
				if( document.createEvent ){
					var event = document.createEvent( "Event" );
					event.initEvent( evts[ i ], true, true );
					event._args = args;
					this.dispatchEvent( event );
				} else if ( document.createEventObject ){
					if( document.documentElement[ evts[ i ] ] === undefined ) {
						document.documentElement[ evts[ i ] ] = {};
					}
					document.documentElement[ evts[ i ] ] = {
						"el" : this,
						_args: args
					};
					document.documentElement[ evts[ i ] ][ evts[ i ] ]++;
				}
			}
		});
	};
}());