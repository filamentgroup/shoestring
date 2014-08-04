//>>excludeStart("exclude", pragmas.exclude);
define([ "shoestring", "extensions/dom/closest" ], function(){
//>>excludeEnd("exclude");

	shoestring.fn.bind = function( evt, data, originalCallback ){

		//>>includeStart("development", pragmas.development);
		if( arguments.length > 3 ){
			shoestring.error( 'on-delegate' );
		}
		if( typeof data === "string" ){
			shoestring.error( 'on-delegate' );
		}
		//>>includeEnd("development");
		if( typeof data === "function" ){
			originalCallback = data;
			data = null;
		}

		var evts = evt.split( " " ),
			docEl = document.documentElement,
			addToEventCache = function( el, evt, callback ) {
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
				if( callback.customCallfunc ) {
					obj.isCustomEvent = true;
				}
				obj.callback = callback.customCallfunc || callback.callfunc;
				obj.originalCallback = callback.originalCallback;

				el.shoestringData.events[ evt ].push( obj );
			};

		function encasedCallback( e ){
			e.data = data;

			// thanks https://github.com/jonathantneal/EventListener
			e.target = e.target || e.srcElement;
			e.preventDefault = e.preventDefault || function () {
				e.returnValue = false;
			};
			e.stopPropagation = e.stopPropagation || function () {
				e.cancelBubble = true;
			};

			return originalCallback.apply(this, [ e ].concat( e._args ) );
		}

		// This is exclusively for custom events on browsers without addEventListener (IE8)
		function propChange( originalEvent, boundElement ) {
			var triggeredElement = document.documentElement[ originalEvent.propertyName ].el;

			if( triggeredElement !== undefined && shoestring( triggeredElement ).closest( boundElement ).length ) {
				encasedCallback.call( triggeredElement, originalEvent );
			}
		}

		// In IE8 the events trigger in a reverse order. This code unbinds and
		// rebinds all callbacks on an element in the correct order.
		function reorderEvents( eventName ) {
			if( !this.attachEvent ) {
				// do onthing
				return;
			} else if( this.shoestringData && this.shoestringData.events ) {
				var otherEvents = this.shoestringData.events[ eventName ];
				for( var j = otherEvents.length - 1; j >= 0; j-- ) {
					if( !otherEvents[ j ].isCustomEvent ) {
						this.detachEvent( "on" + eventName, otherEvents[ j ].callback );
						this.attachEvent( "on" + eventName, otherEvents[ j ].callback );
					} else {
						docEl.detachEvent( "onpropertychange", otherEvents[ j ].callback );
						docEl.attachEvent( "onpropertychange", otherEvents[ j ].callback );
					}
				}
			}
		}

		return this.each(function(){
			var domEventCallback, customEventCallback, oEl = this;

			for( var i = 0, il = evts.length; i < il; i++ ){
				var evt = evts[ i ];
				domEventCallback = null;
				customEventCallback = null;

				if( "addEventListener" in this ){
					this.addEventListener( evt, encasedCallback, false );
				} else if( this.attachEvent ){
					if( this[ "on" + evt ] !== undefined ) {
						domEventCallback = function( originalEvent ) {
							return encasedCallback.call( oEl, originalEvent );
						};
						this.attachEvent( "on" + evt, domEventCallback );
					} else {
						customEventCallback = (function() {
							var eventName = evt;
							return function( e ) {
								if( e.propertyName === eventName ) {
									propChange.call( this, e, oEl );
								}
							};
						})();
						docEl.attachEvent( "onpropertychange", customEventCallback );
					}
				}

				addToEventCache( this, evts[ i ], {
					callfunc: domEventCallback || encasedCallback,
					customCallfunc: customEventCallback,
					originalCallback: originalCallback
				});

				reorderEvents.call( oEl, evt );
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
