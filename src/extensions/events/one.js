//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/events/bind", "extensions/events/unbind" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.one = function( evt, callback ){
		var evts = evt.split( " " );
		return this.each(function(){
			var cbs = {},
				$t = shoestring( this );

			for( var i = 0, il = evts.length; i < il; i++ ){
				var thisevt = evts[ i ];
				cbs[ thisevt ] = function( e ){
					var $t = shoestring( this );
					for( var j in cbs ) {
						$t.unbind( j, cbs[ j ] );
					}
					callback.apply( this, [ e ].concat( e._args ) );
				};
				$t.bind( thisevt, cbs[ thisevt ] );
			}
		});
	};

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
