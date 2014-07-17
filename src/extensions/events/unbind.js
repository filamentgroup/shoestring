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

				var bound = this.shoestringData.events[ evt ],
					bindingname;
				if( "removeEventListener" in window ){
					if( callback !== undefined ) {
						bindingname = callback.toString();
						this.removeEventListener( evts[ i ], bound[ bindingname ], false );
					} else {
						for ( ev in bound ) {
							this.removeEventListener( evts[ i ], bound[ ev ], false );
						}
					}
				}
				else if( this.detachEvent ){
					if( callback !== undefined ) {
						bindingname = callback.toString();
						this.detachEvent( "on" + evts[ i ], bound[ bindingname ] );
						// custom event
						docEl.detachEvent( "onpropertychange", bound[ '_' + bindingname ] );
					} else {
						for ( ev in bound ) {
							// since the _ev and ev will both be keys here, we’ll detach both methods for each
							this.detachEvent( "on" + evts[ i ], bound[ ev ] );
							// custom event
							docEl.detachEvent( "onpropertychange", bound[ ev ] );
						}
					}
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
