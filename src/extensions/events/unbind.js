//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.unbind = function( evt, callback ){
		var evts = evt.split( " " ),
			docEl = document.documentElement;
		return this.each(function(){
			for( var i = 0, il = evts.length; i < il; i++ ){
				//>>includeStart("development", pragmas.development);
				if( evts[ i ].indexOf( "." ) === 0 ) {
					shoestring.error( 'event-namespaces' );
				}
				//>>includeEnd("development");

				var bound = this.shoestringData.events[ evt ];
				for( var j = 0, jl = bound.length; j < jl; j++ ) {
					if( "removeEventListener" in window ){
						if( callback === undefined ) {
							this.removeEventListener( evts[ i ], bound[ j ].callback, false );
						} else if( callback === bound[ j ].originalCallback ) {
							this.removeEventListener( evts[ i ], bound[ j ].callback, false );
						}
					} else if( this.detachEvent ){
						if( callback === undefined ) {
							this.detachEvent( "on" + evts[ i ], bound[ j ].callback );
							// custom event
							docEl.detachEvent( "onpropertychange", bound[ j ].callback );
						} else if( callback === bound[ j ].originalCallback ) {
							this.detachEvent( "on" + evts[ i ], bound[ j ].callback );
							// custom event
							docEl.detachEvent( "onpropertychange", bound[ j ].callback );
						}
					}
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
