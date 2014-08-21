//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.trigger = function( evt, args ){
		var evts = evt.split( " " );

		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				if( document.createEvent ){
					var event = document.createEvent( "Event" );
					event.initEvent( evts[ i ], true, true );
					event._args = args;

					this.dispatchEvent( event );
				} else if ( document.createEventObject ) {
					if( ( "" + this[ evts[ i ] ] ).indexOf( "function" ) > -1 ) {
						this[ evts[ i ] ]();
					} else {
						document.documentElement[ evts[ i ] ] = {
							"el": this,
							_args: args
						};
					}
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
