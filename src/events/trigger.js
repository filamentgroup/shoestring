//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "events/reorder" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.trigger = function( evt, args ){
		var evts = evt.split( " " );

		return this.each(function(){
			var split, evt, namespace;
			for( var i = 0, il = evts.length; i < il; i++ ){
				split = evts[ i ].split( "." ),
				evt = split[ 0 ],
				namespace = split.length > 0 ? split[ 1 ] : null;

				if( document.createEvent ){
					var event = document.createEvent( "Event" );
					event.initEvent( evt, true, true );
					event._args = args;
					event._namespace = namespace;

					this.dispatchEvent( event );
				} else if ( document.createEventObject ) {
					if( ( "" + this[ evt ] ).indexOf( "function" ) > -1 ) {
						this.ssEventTrigger = {
							_namespace: namespace,
							_args: args
						};

						this[ evt ]();
					} else {
						// If DOM Event, reorder on bind
						// If Custom Event, reorder on trigger
						reorderEvents( this, evt );

						document.documentElement[ evt ] = {
							"el": this,
							_namespace: namespace,
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
