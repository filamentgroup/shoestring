//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.one = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			var cb;

			for( var i = 0, il = evts.length; i < il; i++ ){
				var thisevt = evts[ i ];
				if( "addEventListener" in this ){
					cb = function( e ){
						callback.apply( this, [ e ].concat( e._args ) );
						this.removeEventListener( thisevt, cb );
					};
					this.addEventListener( thisevt, cb, false );
				}
				else if( this.attachEvent ){
					cb = function( e ){
						callback.apply( this, [ e ].concat( e._args ) );
						this.detachEvent( "on" + thisevt, cb );
					};
					this.attachEvent( "on" + thisevt, cb );
				}
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
