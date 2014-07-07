//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.one = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			var cbs = {};

			for( var i = 0, il = evts.length; i < il; i++ ){
				var thisevt = evts[ i ];
				if( "addEventListener" in this ){
					cbs[ thisevt ] = function( e ){
						for( var j in cbs ) {
							this.removeEventListener( j, cbs[ j ] );
						}
						callback.apply( this, [ e ].concat( e._args ) );
					};
					this.addEventListener( thisevt, cbs[ thisevt ], false );
				}
				else if( this.attachEvent ){
					cbs[ thisevt ] = function( e ){
						callback.apply( this, [ e ].concat( e._args ) );
						for( var j in cbs ) {
							this.detachEvent( "on" + j, cbs[ j ] );
						}
					};
					this.attachEvent( "on" + thisevt, cbs[ thisevt ] );
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
