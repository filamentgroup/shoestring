//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.on = function( evt, callback ){
		var evts = evt.split( " " ),
			sel = this.selector;

		function newCB( e ){
			shoestring( sel ).each(function(){
				if( e.target === this ){
					callback.apply( this, [ e ].concat( e._args ) );
				}
			});
		}

		for( var i = 0, il = evts.length; i < il; i++ ){
			if( "addEventListener" in document ){
				document.addEventListener( evts[ i ], newCB, false );
			}
			else if( document.attachEvent ){
				document.attachEvent( "on" + evts[ i ], newCB );
			}
		}
		return this;
	};

	shoestring.fn.live = shoestring.fn.on;

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
