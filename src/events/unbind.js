//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	function unbind( evt, namespace, callback ) {
		var bound = this.shoestringData.events[ evt ];
		if( !bound.length ) {
			return;
		}

		for( var j = 0, jl = bound.length; j < jl; j++ ) {
			if( !namespace || namespace === bound[ j ].namespace ) {
				if( "removeEventListener" in window ){
					if( callback === undefined || callback === bound[ j ].originalCallback) {
						this.removeEventListener( evt, bound[ j ].callback, false );
					}
				} else if( this.detachEvent ){
					if( callback === undefined || callback === bound[ j ].originalCallback ) {
						this.detachEvent( "on" + evt, bound[ j ].callback );
						// custom event
						document.documentElement.detachEvent( "onpropertychange", bound[ j ].callback );
					}
				}
			}
		}
	}

	function unbindAll( namespace, callback ) {
		for( var evtKey in this.shoestringData.events ) {
			unbind.call( this, evtKey, namespace, callback );
		}
	}

	shoestring.fn.unbind = function( str, callback ){
		var evts = str ? str.split( " " ) : [];
		return this.each(function(){
			if( !this.shoestringData || !this.shoestringData.events ) {
				return;
			}

			if( !evts.length ) {
				unbindAll.call( this );
			} else {
				var split, evt, namespace;
				for( var i = 0, il = evts.length; i < il; i++ ){
					split = evts[ i ].split( "." ),
					evt = split[ 0 ],
					namespace = split.length > 0 ? split[ 1 ] : null;

					if( evt ) {
						unbind.call( this, evt, namespace, callback );
					} else {
						unbindAll.call( this, namespace, callback );
					}
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
