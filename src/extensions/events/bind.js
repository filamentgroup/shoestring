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
				var obj = {};
				obj[ callback.name ] = callback.callfunc;
				el.shoestringData.events[ evt ].push( obj );
			};

		function newCB( e ){
			e.data = data;

			// thanks https://github.com/jonathantneal/EventListener
			e.target = e.target || e.srcElement;
			e.preventDefault = e.preventDefault || function () {
				e.returnValue = false;
			};
			e.stopPropagation = e.stopPropagation || function () {
				e.cancelBubble = true;
			};

			return callback.apply(this, [ e ].concat( e._args ) );
		}

		function propChange( originalEvent, boundElement ) {
			var triggeredElement = document.documentElement[ originalEvent.propertyName ].el;

			if( triggeredElement !== undefined && shoestring( triggeredElement ).closest( boundElement ).length ) {
				// make a new event object to avoid event.data forced to a string in IE8
				var e = {};
				for( var j in originalEvent ) {
					e[ j ] = originalEvent[ j ];
				}
				newCB.call( triggeredElement, e );
			}
		}

		function reorderEvents( eventName ) {
			if( this.shoestringData && this.shoestringData.events ) {
				var otherEvents = this.shoestringData.events[ eventName ];
				for( var j = otherEvents.length - 1; j >= 0; j-- ) {
					for( var k in otherEvents[ j ] ) {
						this.detachEvent( "on" + evt, otherEvents[ j ][ k ] );
						this.attachEvent( "on" + evt, otherEvents[ j ][ k ] );
					}
				}
			}
		}

		return this.each(function(){
			var callback, customCallback, oEl = this;

			for( var i = 0, il = evts.length; i < il; i++ ){
				var evt = evts[ i ];
				callback = null;
				customCallback = null;

				if( "addEventListener" in this ){
					this.addEventListener( evt, newCB, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						callback = function( originalEvent ) {
							// make a new event object to avoid event.data forced to a string in IE8
							var e = {};
							for( var j in originalEvent ) {
								e[ j ] = originalEvent[ j ];
							}
							return newCB.call( oEl, e );
						};
						this.attachEvent( "on" + evt, callback);
					} else {
						customCallback = (function() {
							var eventName = evt;
							return function( e ) {
								if( e.propertyName === eventName ) {
									propChange.call( this, e, oEl );
								}
							};
						})();
						docEl.attachEvent( "onpropertychange", customCallback );
					}
				}
				boundEvents( this, evts[ i ], { "callfunc" : customCallback || callback || newCB, "name" : bindingname });

				if( this.attachEvent ) {
					reorderEvents.call( oEl, evt );
				}
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
