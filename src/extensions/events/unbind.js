//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.unbind = function( evt, callback ){
		var evts = evt.split( " " ),
			docEl = document.documentElement;
		return this.each(function(){
			var ev;
			for( var i = 0, il = evts.length; i < il; i++ ){
				//>>includeStart("development", pragmas.development);
				if( evts[ i ].indexOf( "." ) === 0 ) {
					shoestring.error( 'event-namespaces' );
				}
				//>>includeEnd("development");

				var bound = this.shoestringData.events[ evt ], bindingname, j, jl;
				if( "removeEventListener" in window ){
					for( j = 0, jl = bound.length; j < jl; j++ ) {
						if( callback !== undefined ) {
							bindingname = callback.toString();
							this.removeEventListener( evts[ i ], bound[ j ][ bindingname ], false );
						} else {
							for ( ev in bound[ j ] ) {
								this.removeEventListener( evts[ i ], bound[ j ][ ev ], false );
							}
						}
					}
				} else if( this.detachEvent ){
					for( j = 0, jl = bound.length; j < jl; j++ ) {
						if( callback !== undefined ) {
							bindingname = callback.toString();
							this.detachEvent( "on" + evts[ i ], bound[ j ][ bindingname ] );
							// custom event
							docEl.detachEvent( "onpropertychange", bound[ j ][ bindingname ] );
						} else {
							for( ev in bound[ j ] ) {
								this.detachEvent( "on" + evts[ i ], bound[ j ][ ev ] );
								// custom event
								docEl.detachEvent( "onpropertychange", bound[ j ][ ev ] );
							}
						}
					}
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
