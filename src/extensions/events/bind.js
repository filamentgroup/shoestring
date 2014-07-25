//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/closest" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.bind = function( evt, data, callback ){

		//>>includeStart("development", pragmas.development);
		if( arguments.length > 3 ){
			shoestring.error( 'on-delegate' );
		}
		if( typeof data === "string" ){
			shoestring.error( 'on-delegate' );
		}
		//>>includeEnd("development");
		if( typeof data === "function" ){
			callback = data;
			data = null;
		}

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
			e.data = data;

			// thanks https://github.com/jonathantneal/EventListener
			e.target = e.target || e.srcElement;
			e.preventDefault = e.preventDefault || function () {
				e.returnValue = false;
			};
			e.stopPropagation = function () {
				e.cancelBubble = true;
			};

			return callback.apply(e.target, [ e ].concat( e._args ) );
		}
		function propChange( e, boundElement ) {
			var triggeredElement = document.documentElement[ e.propertyName ].el;

			if( triggeredElement !== undefined && shoestring( triggeredElement ).closest( boundElement ).length ) {
				newCB.call( triggeredElement, e );
			}
		}

		return this.each(function(){
			var callback, oEl = this;

			for( var i = 0, il = evts.length; i < il; i++ ){
				var evt = evts[ i ];
				callback = null;

				if( "addEventListener" in this ){
					this.addEventListener( evt, newCB, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						this.attachEvent( "on" + evt, function(e) {
							return newCB.call( oEl, e );
						});
					} else {
						// Custom event
						callback = (function() {
							var eventName = evt;
							return function( e ) {
								if( e.propertyName === eventName ) {
									propChange.call( this, e, oEl );
								}
							};
						})();
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
