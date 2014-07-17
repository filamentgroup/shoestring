//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/closest" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.bind = function( evt, callback ){

		//>>includeStart("development", pragmas.development);
		if( arguments.length > 2 ){
			shoestring.error( 'on-delegate' );
		}
		//>>includeEnd("development");

		var evts = evt.split( " " ),
			docEl = document.documentElement,
			bindingname = callback.toString(),
			boundEvents = function( el, evt, callback ) {
				if ( !el.shoestringData ) {
					el.shoestringData = {};
				}
				if ( !el.shoestringData.events ) {
					el.shoestringData.events = {};
				}
				if ( !el.shoestringData.events[ evt ] ) {
					el.shoestringData.events[ evt ] = [];
				}
				el.shoestringData.events[ evt ][ callback.name ] = callback.callfunc;
				// IE custom events
				el.shoestringData.events[ evt ][ '_' + callback.name ] = callback._callfunc;
			};

		function newCB( e ){
			return callback.apply( this, [ e ].concat( e._args ) );
		}
		function propChange( e, boundElement ) {
			var lastEvent = document.documentElement[ e.propertyName ],
				triggeredElement = lastEvent.el;

			if( triggeredElement !== undefined && shoestring( triggeredElement ).closest( boundElement ).length ) {
				newCB.call( triggeredElement, e );
			}
		}

		return this.each(function(){
			var callback, oEl = this;

			callback = function( e ) {
				propChange.call( this, e, oEl );
			};

			for( var i = 0, il = evts.length; i < il; i++ ){
				var evt = evts[ i ];

				if( "addEventListener" in this ){
					this.addEventListener( evt, newCB, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						this.attachEvent( "on" + evt, newCB );
					} else {
						// Custom event
						docEl.attachEvent( "onpropertychange", callback );
					}
				}
				boundEvents( this, evts[ i ], { "callfunc" : newCB, "name" : bindingname, "_callfunc": callback });
			}
		});
	};

	shoestring.fn.on = shoestring.fn.bind;

	//>>includeStart("development", pragmas.development);
	shoestring.fn.live = function(){
		shoestring.error( 'live-delegate' );
	};
	shoestring.fn.delegate = function(){
		shoestring.error( 'live-delegate' );
	};
		//>>includeEnd("development");

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
